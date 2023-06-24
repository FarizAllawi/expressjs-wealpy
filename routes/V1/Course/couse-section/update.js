require('dotenv').config()


const { Course, CourseSection } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        id: {type: "string", uuid: true},
        name : {type: "string", min:3, optional:true},
        description: {type: "string", optional:true},
        courseId: {type: "string", uuid: true, optional:true}
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        // Is name of course section already exists
        const courseSection = await CourseSection.findOne({
            where: {
                id : { [Op.not]: req.body.id},
                [Op.or] : {
                    name: req.body.name
                }
            }
        });

        if (courseSection) {
            return res.status(400).json({
                status: 'error',
                message: "Course Section already exists"
            });
        }

        if (req.body.courseId) {
            // Check is course exists
            const course = await Course.findByPk(req.body.courseId);

            if (!course) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Course not found'
                });
            }
        }

        // Only update required data
        const updateCourseSection = await CourseSection.findByPk(req.body.id);

        if (req.body.name) {
            updateCourseSection.name = req.body.name;
            updateCourseSection.slug = Slugify(req.body.name);
        }

        updateCourseSection.description = req.body.description ? req.body.description : updateCourseSection.description;
        updateCourseSection.courseId = req.body.courseId ? req.body.courseId : updateCourseSection.courseId;
        await updateCourseSection.save();

        return res.json({
            status: 'success',
            data: updateCourseSection
        })
    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}