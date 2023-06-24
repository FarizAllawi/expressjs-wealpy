require('dotenv').config()


const {Storage} = require('@google-cloud/storage');
const {Media} = require('../../../sequelize/models');
const Validator = require('fastest-validator');
const v = new Validator();

const storage = new Storage({keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS})

module.exports = async (req, res, next) => {

    const { id, path } = req.query;
    const schema = {
        id: {type: "string", uuid: true, optional: true},
        path: {type: "string", optional: true},
    }

    const validate = v.validate(req.query, schema)

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    try {
        const where = {};

        if (id) where.id = id;
        if (path) where.filePath = path;

        const media = await Media.findOne({where});

        if (!media) {
            return res.status(400).json({
                status: 'error',
                message: "Media not found"
            });
        }

        const bucket = await storage.bucket(
            media.accessType === 'public'
                ? process.env.GOOGLE_PUBLIC_BUCKET_NAME
                : process.env.GOOGLE_PRIVATE_BUCKET_NAME
        );

        const file = await bucket.file(media.filePath);

        // Get Metadata
        const data = await file.getMetadata().then((data) => {
            return data[0];
        })
            .catch((err) => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error get File'
                })
            });


        // Get file url
        let fileUrl = `${process.env.GOOGLE_PUBLIC_URL}/${process.env.GOOGLE_PUBLIC_BUCKET_NAME}/${media.filePath}`

        if (media.accessType === 'private') {
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

        // Get filename
        const fileName = req.query.path.split('/')

        return res.status(200).send({
            status: 'success',
            data: {
                id: media.id,
                userId: media.userId,
                url: fileUrl,
                name: fileName[fileName.length-1],
                fileType: data.mimetype,
                fileSize: data.size,
                filePath: data.name,
                accessType : media.accessType
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Service Unavailable"
        })
    }

}