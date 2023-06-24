require('dotenv').config()


const { Course, Users } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        name : {type: "string", min:3},
        thumbnail: {type: "string", min:3},
        description: {type: "string", optional:true},
        type: {type: "enum",  values: ["free", "premium"]},
        level: {type: "enum",  values: ['all-level','basic', 'beginner','intermediate', 'advance', 'expert']},
        mentor: {type: "string", uuid: true},
        price: {type: "number", positive: true, optional:true},
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        // Is name of course already exists
        const course = await Course.findOne({
            where: {
                [Op.or] : {
                    name: req.body.name,
                    slug: Slugify(req.body.name)
                }
            }
        });

        if (course) {
            return res.status(400).json({
                status: 'error',
                message: "Course already exists"
            });
        }

        // Check is mentor exists
        const mentor = await Users.findByPk(req.body.mentor);

        if (!mentor) {
            return res.status(400).json({
                status: 'error',
                message: 'Mentor not found'
            });
        }

        // Create Users if no error present
        const createdCourse = await Course.create({
            name : req.body.name,
            slug: Slugify(req.body.name),
            thumbnail: req.body.thumbnail,
            description: req.body.description,
            type: req.body.type,
            level: req.body.level,
            mentor: req.body.mentor,
            price: req.body.price,
        });

        return res.json({
            status: 'success',
            data: createdCourse
        })
    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}