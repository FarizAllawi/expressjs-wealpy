
require('dotenv').config()


const { Course, Category, CourseCategory  } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        courseId: {type: "string", uuid:true},
        categoryId: {type: "string", uuid:true},
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        const category = await Category.findByPk(req.body.categoryId);

        if (!category) {
            return res.status(400).json({
                status: 'error',
                message: "Category Not Found"
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

        // Is course_category already exists
        const courseCategory = await CourseCategory.findOne({
            where: {
                courseId: req.body.courseId,
                categoryId: req.body.categoryId,
            }
        });

        if (courseCategory) {
            return res.status(400).json({
                status: 'error',
                message: "Course Category already exists"
            });
        }

        // Create Course section if no error present
        const createdCourseCategory = await CourseCategory.create({
            courseId: req.body.courseId,
            categoryId: req.body.categoryId,
        });

        return res.json({
            status: 'success',
            data: createdCourseCategory
        })
    } catch(error) {
        console.log("error:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}