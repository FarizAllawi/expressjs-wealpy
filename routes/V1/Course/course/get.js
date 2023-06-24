require('dotenv').config()


const { Course } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res, next) => {

    const {
        id, slug, type, level, mentor, price
    } = req.query;

    const schema = {
        id: {type: "string", uuid:true, optional:true},
        slug : {type: "string", optional:true},
        type: {type: "enum",  values: ["free", "premium"], optional:true},
        level: {type: "enum",  values: ['all-level','basic', 'beginner','intermediate', 'advance', 'expert'], optional:true},
        mentor: {type: "string", uuid: true, optional:true},
        price: {type: "number", positive: true, optional:true},
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
        if (type) where.type = type;
        if (level) where.level = level;
        if (mentor) where.mentor = mentor;
        if (price) where.price = price
        if (slug) where.slug = {[Op.like]: `%${Slugify(slug)}%`};

        const course = await Course.findAll({where});

        return res.json({
            status: "Success",
            data: course
        });

    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}