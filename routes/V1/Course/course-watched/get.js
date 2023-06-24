require('dotenv').config()


const { CourseWatched } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res, next) => {

    const {
        id, courseVideoId, userId
    } = req.query;

    const schema = {
        id: {type: "string", uuid:true, optional:true},
        courseVideoId : {type: "string", uuid:true, optional:true},
        userId: {type: "string", uuid:true, optional:true},
    }

    try {
        const where = {};

        if (id) where.id = id;
        if (courseVideoId) where.courseVideoId = courseVideoId;
        if (userId) where.userId = userId;

        const courseWatched = await CourseWatched.findAll({where});

        return res.json({
            status: "Success",
            data: courseWatched
        });

    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}