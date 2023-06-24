require('dotenv').config()


const { CourseVideo } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res, next) => {

    const {
        id, slug, sectionId
    } = req.query;

    const schema = {
        id: {type: "string", uuid:true, optional:true},
        slug : {type: "string", optional:true},
        sectionId: {type: "string", uuid:true, optional:true},
    }

    const validate = v.validate(req.query, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        const where = {};

        if (id) where.id = id;
        if (sectionId) where.sectionId = sectionId;
        if (slug) where.slug = {[Op.like]: `%${Slugify(slug)}%`};

        const courseVideo = await CourseVideo.findAll({where});

        return res.json({
            status: "Success",
            data: courseVideo
        });

    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}