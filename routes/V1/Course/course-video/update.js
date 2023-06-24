
require('dotenv').config()


const { CourseSection, CourseVideo  } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        id: {type: "string", uuid: true},
        name : {type: "string", min:3, optional:true},
        time: {type: "object", props: {
                hour: { type: "number", integer: true, min: 0, max: 23 },
                minute: { type: "number", integer: true, min: 0, max: 59 },
                second: { type: "number", integer: true, min: 0, max: 59 },
            },
            optional: true,
        },
        content: {type: "string", min: 3, optional:true},
        accessType: {type: "enum", values: ["public", "membership"], optional:true},
        sectionId: {type: "string", uuid:true, optional:true},
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {

        const where = {};

        if (req.body.name) where.name = req.body.name;
        if (req.body.content) where.content = req.body.content;


        if (where) {
            // Is name of video already exists
            where.id = {[Op.not]: req.body.id}
            const findVideo = await CourseVideo.findOne({where});

            if (findVideo) {
                return res.status(400).json({
                    status: 'error',
                    message: "Course Video already exists"
                });
            }
        }

        if (req.body.sectionId) {
            // Is course section alrready exists
            const section = await CourseSection.findByPk(req.body.sectionId);

            if (!section) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Course Section not found'
                });
            }
        }


        // Update Course Video if no error present
        const video = await CourseVideo.findByPk(req.body.id);

        if (!video) {
            return res.status(400).json({
                status: 'error',
                message: "Course Video not found"
            });
        }

        if (req.body.name) {
            video.name = req.body.name;
            video.slug = Slugify(req.body.name);
        }

        if (req.body.time) {
            const time = `${req.body.time.hour}:${req.body.time.minute}:${req.body.time.second}`;
            video.time = time;
        }

        video.content = req.body.content ? req.body.content : video.content;
        video.accessType = req.body.accessType ? req.body.accessType : video.accessType;
        video.sectionId = req.body.sectionId ? req.body.sectionId : video.sectionId;
        await video.save();
        return res.json({
            status: 'success',
            data: video
        });

    } catch(error) {
        console.log("error:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}