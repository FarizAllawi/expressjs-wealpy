require('dotenv').config()


const { CourseCategory } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res, next) => {

    const {
        id, categoryId, courseId
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
        if (categoryId) where.categoryId = categoryId;
        if (courseId) where.courseId = courseId;

        const courseCategory = await CourseCategory.findAll({where});

        return res.json({
            status: "Success",
            data: courseCategory
        });

    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}