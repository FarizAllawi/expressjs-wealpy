require('dotenv').config()


const { Users } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const CrytoJS = require('crypto-js');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        name : {type: "string", min:3},
        username: {type: "string", min:3},
        email: {type: "email"},
        password: {type: "string", min: 8},
        proffesion: {type: "string", optional: true},
        telegram: {type: "string", optional: true},
        instagram: {type: "string", optional:true},
        tiktok: {type: "string", optional:true},
        phone: {type: "string", min:10, optional:true},
        address: {type: "string", optional: true},
        photo: {type: "string", optional: true}
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        // Is username already exists
        const users = await Users.findOne({
            where: {
                [Op.or]: {
                    username: req.body.username,
                    email: req.body.email,
                }
            }
        });

        if (users) {
            return res.status(400).json({
                status: 'error',
                message: "Users already exists"
            });
        }

        const password  = CrytoJS.AES.encrypt(req.body.password, process.env.AES_SECRET_KEY).toString();

        // Create Users if no error present
        const createdUsers = await Users.create({
            name : req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: password,
            proffesion: req.body.proffesion,
            telegram: req.body.telegram,
            instagram: req.body.proffesion,
            tiktok: req.body.tiktok,
            phone: req.body.phone,
            address: req.body.address,
            photo: req.body.photo
        });

        return res.json({
            status: 'success',
            data: createdUsers
        })
    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}