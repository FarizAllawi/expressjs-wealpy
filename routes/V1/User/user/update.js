require('dotenv').config()


const { Users } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const CrytoJS = require('crypto-js');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        id : {type: "string", uuid:true},
        name: {type: "string", min: 3, optional:true},
        username: {type: "string", min: 3, optional:true},
        email: {type: "email", optional:true},
        proffesion: {type: "string", optional: true},
        telegram: {type: "string", optional: true},
        instagram: {type: "string", optional: true},
        tiktok: {type: "string", optional: true},
        phone: {type: "string", min: 10, optional: true},
        address: {type: "string", optional: true},
        photo: {type: "string", optional: true}
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        if (req.body.email || req.body.username || req.body.phone) {
            const where = {};

            if (req.body.email) where.email = req.body.email;
            if (req.body.username) where.username = req.body.username;
            if (req.body.phone) where.phone = req.body.phone;

            const findUser = await Users.findOne({
                where: {
                    id: { [Op.not]: req.body.id },
                    [Op.or]: where
                }
            });

            if (findUser) {
                return res.status(400).json({
                    status: "error",
                    message: "user already exists"
                });
            }
        }

        const user = await Users.findByPk(req.body.id);

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user not found"
            });
        }

        // Only update field that need to update
        user.name = req.body.name ? req.body.name : user.name;
        user.username = req.body.username ? req.body.username : user.username;
        user.email = req.body.email ? req.body.email : user.email;
        user.proffesion = req.body.proffesion ? req.body.proffesion : user.proffesion;
        user.telegram = req.body.telegram ? req.body.telegram : user.telegram;
        user.tiktok = req.body.tiktok ? req.body.tiktok : user.tiktok;
        user.instagram = req.body.instagram ? req.body.instagram : user.instagram;
        user.phone = req.body.phone ? req.body.phone : user.phone;
        user.address = req.body.address ? req.body.address : user.address;
        user.photo = req.body.photo ? req.body.photo : user.photo;
        await user.save();

        return res.json({
            status: "success",
            data : user
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Service Unavailable"
        });
    }
}