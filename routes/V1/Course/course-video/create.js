
require('dotenv').config()


const { CourseSection, CourseVideo  } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        name : {type: "string", min:3},
        time: {type: "object", props: {
                hour: { type: "number", integer: true, min: 0, max: 23 },
                minute: { type: "number", integer: true, min: 0, max: 59 },
                second: { type: "number", integer: true, min: 0, max: 59 },
            },
        },
        content: {type: "string", min: 3},
        accessType: {type: "enum", values: ["public", "membership"]},
        sectionId: {type: "string", uuid:true},
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        // Is name of video already exists
        const video = await CourseVideo.findOne({
            where: {
                name: req.body.name
            }
        });

        if (video) {
            return res.status(400).json({
                status: 'error',
                message: "Course Video already exists"
            });
        }

        // Is course section alrready exists
        const section = await CourseSection.findByPk(req.body.sectionId);

        if (!section) {
            return res.status(400).json({
                status: 'error',
                message: 'Course Section not found'
            });
        }

        // Create Course Video if no error present

        const time = `${req.body.time.hour}:${req.body.time.minute}:${req.body.time.second}`;
        const createdCourseVideo = await CourseVideo.create({
            name: req.body.name,
            slug: Slugify(req.body.name),
            time: time, // Construct the time value,
            content: req.body.content,
            accessType: req.body.accessType,
            sectionId: req.body.sectionId
        });

        return res.json({
            status: 'success',
            data: createdCourseVideo
        });

    } catch(error) {
        console.log("error:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}