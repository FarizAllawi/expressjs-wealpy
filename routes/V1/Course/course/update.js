require('dotenv').config()


const { Course, Users } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const { Slugify } = require('../../../../helpers');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        id: {type: "string", uuid: true},
        name : {type: "string", min:3, optional:true},
        thumbnail: {type: "string", min:3, otional:true},
        description: {type: "string", optional:true},
        type: {type: "enum",  values: ["free", "premium"], optional:true},
        level: {type: "enum",  values: ['all-level','basic', 'beginner','intermediate', 'advance', 'expert'], optional:true},
        mentor: {type: "string", uuid: true, optional:true},
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
                id : { [Op.not]: req.body.id},
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

        if (req.body.mentor) {
            // Check is mentor exists
            const mentor = await Users.findByPk(req.body.mentor);

            if (!mentor) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Mentor not found'
                });
            }
        }

        // Only update required data
        const updateCourse = await Course.findByPk(req.body.id);
        if (req.body.name) {
            updateCourse.name = req.body.name;
            updateCourse.slug = Slugify(req.body.name);
        }

        updateCourse.thumbnail = req.body.thumbnail ? req.body.thumbnail : updateCourse.thumbnail;
        updateCourse.description = req.body.description ? req.body.description : updateCourse.description;
        updateCourse.type = req.body.type ? req.body.type : updateCourse.type;
        updateCourse.level = req.body.level ? req.body.level : updateCourse.level;
        updateCourse.mentor = req.body.mentor ? req.body.mentor : updateCourse.mentor;
        updateCourse.price = req.body.price ? req.body.price : updateCourse.price;
        await updateCourse.save();

        return res.json({
            status: 'success',
            data: updateCourse
        })
    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}