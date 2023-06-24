require('dotenv').config()


const { CourseSection } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res, next) => {

    const {
        id, slug, courseId
    } = req.query;

    const schema = {
        id: {type: "string", uuid:true, optional:true},
        slug : {type: "string", optional:true},
        courseId: {type: "string", uuid:true, optional:true},
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
        if (courseId) where.courseId = courseId;
        if (slug) where.slug = {[Op.like]: `%${Slugify(slug)}%`};

        const courseSection = await CourseSection.findAll({where});

        return res.json({
            status: "Success",
            data: courseSection
        });

    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}