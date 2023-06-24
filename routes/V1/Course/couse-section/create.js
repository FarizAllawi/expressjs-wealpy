
require('dotenv').config()


const { Course, CourseSection } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        name : {type: "string", min:3},
        description: {type: "string", optional:true},
        courseId: {type: "string", uuid:true},
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
        const courseSection = await CourseSection.findOne({
            where: {
                [Op.or] : {
                    name: req.body.name,
                    slug: Slugify(req.body.name)
                }
            }
        });

        if (courseSection) {
            return res.status(400).json({
                status: 'error',
                message: "Course Section already exists"
            });
        }

        // Check is course exists
        const course = await Course.findByPk(req.body.courseId);

        if (!course) {
            return res.status(400).json({
                status: 'error',
                message: 'Course not found'
            });
        }

        // Create Course section if no error present
        const createdCourseSection = await CourseSection.create({
            name : req.body.name,
            slug: Slugify(req.body.name),
            description: req.body.description,
            courseId: req.body.courseId
        });

        return res.json({
            status: 'success',
            data: createdCourseSection
        })
    } catch(error) {
        console.log("error:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}