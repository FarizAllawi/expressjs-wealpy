
require('dotenv').config()


const { Users, CourseVideo, CourseWatched  } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        userId: {type: "string", uuid:true},
        courseVideoId: {type: "string", uuid:true},
        watchingDuration: {
            type: "object",
            props: {
                hour: { type: "number", integer: true, min: 0, max: 23 },
                minute: { type: "number", integer: true, min: 0, max: 59 },
                second: { type: "number", integer: true, min: 0, max: 59 },
            },
            optional: true
        },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        const user = await Users.findByPk(req.body.userId);

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: "User Not Found"
            });
        }

        // Check is course exists
        const video = await CourseVideo.findByPk(req.body.courseVideoId);

        if (!video) {
            return res.status(400).json({
                status: 'error',
                message: 'Video not found'
            });
        }

        // Is course_watched already exists
        const courseWatched = await CourseWatched.findOne({
            where: {
                userId: req.body.userId,
                courseVideoId: req.body.courseVideoId,
            }
        });

        if (courseWatched) {
            return res.status(400).json({
                status: 'error',
                message: "Course Video already exists"
            });
        }

        if (req.body.watchingDuration) {
            // split time
            let time = video.time;
            time = time.split(':');

            let hour = parseInt(time[0]);
            let minute = parseInt(time[1]);

            if (req.body.watchingDuration.hour > hour ||
                req.body.watchingDuration.minute > minute) {
                return res.status(400).json({
                    status: 'error',
                    message: "Watch duration is higher than the video's duration"
                });
            }
        }

        // Construct the time value in the format suitable for Sequelize
        const time = req.body.watchingDuration
            ? `${req.body.watchingDuration.hour}:${req.body.watchingDuration.minute}:${req.body.watchingDuration.second}`
            : null;

        const createdCourseWatched = await CourseWatched.create({
            userId: req.body.userId,
            courseVideoId: req.body.courseVideoId,
            watchingDuration: time,
        });

        return res.json({
            status: 'success',
            data: createdCourseWatched
        })
    } catch(error) {
        console.log("error:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}