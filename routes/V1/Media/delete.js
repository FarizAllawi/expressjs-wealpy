require('dotenv').config()


const {Storage} = require('@google-cloud/storage');
const Validator = require('fastest-validator')
const {Media} = require("../../../sequelize/models");
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

        await bucket.file(media.filePath).delete().then(() => {
            return res.status(200).send({
                status: 'success',
                message: 'File deleted successfully.',
            });
        })
        .catch((err) => {
            return res.status(500).send({
                status: 'error',
                message: 'Failed to delete file.',
            });
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Service Unavailable',
        });
    }
}