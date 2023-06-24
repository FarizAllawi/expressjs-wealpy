require('dotenv').config()


const {Storage} = require('@google-cloud/storage');
const {Media} = require('../../../sequelize/models');
const Validator = require('fastest-validator');
const Multer = require('multer');
const v = new Validator();

const storage = new Storage({keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS});

// Configure Multer to use Google Cloud Storage as the storage engine
const multerStorage = Multer.memoryStorage();
const upload = Multer({ storage: multerStorage });

module.exports = (req, res, next) => {

    try {
        const singleUpload = upload.single('file')

        singleUpload(req, res, function (err) {

            const schema = {
                userId: {type: "string"},
                access: { type:"enum",  values:['public', 'private'], default: 'private'},
                folder: { type: "string", optional: true}
            }

            const validate = v.validate(req.body, schema)

            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                })
            }

            if (!req.file) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Please upload a file'
                })
            }

            const environment = process.env.APP_DEBUG ? 'development' : 'production';

            const bucket = storage.bucket(
                req.body.access === 'public'
                    ? process.env.GOOGLE_PUBLIC_BUCKET_NAME
                    : process.env.GOOGLE_PRIVATE_BUCKET_NAME
            );

            // Define the folder name and object name
            const folderName =  `${environment}/${req.body.userId}${ req.body.folder ? `/${req.body.folder}` : ''}`
            const objectName = `${folderName}/${req.file.originalname}`;

            const file = bucket.file(objectName);

            const stream = file.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype,
                },
            });

            stream.on('error', (err) => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error uploading file'
                })
            });

            stream.on('finish', async () => {


                let fileUrl = `${process.env.GOOGLE_PUBLIC_URL}/${process.env.GOOGLE_PUBLIC_BUCKET_NAME}/${objectName}`

                if (req.body.access === 'private') {
                    const getSignedUrlOptions = {
                        version: 'v4',
                        action: 'read',
                        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // URL expiration time (7 days in milliseconds)
                    };

                    await file.getSignedUrl(getSignedUrlOptions).then( signedUrl => {
                        fileUrl = signedUrl[0];
                    })
                        .catch(err => {
                            return res.status(500).send({
                                status: 'error',
                                message: 'Error uploading file'
                            })
                        })
                }

                const media = await Media.create({
                    userId: req.body.userId,
                    name: req.file.originalname,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size,
                    filePath: objectName,
                    url: fileUrl,
                    accessType: req.body.access
                })

                res.status(200).send({
                    status: 'success',
                    message: 'File uploaded successfully.',
                    data: media
                });

            });

            stream.end(req.file.buffer);
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Service Unavailable"
        })
    }

}