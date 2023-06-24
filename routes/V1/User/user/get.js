require('dotenv').config()


const { Users } = require('../../../../sequelize/models');
const { Op } = require('sequelize');
const CrytoJS = require('crypto-js');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res, next) => {

    const {
        id,
        name,
        username,
        email,
        phone,
        proffesion,
        instagram,
        tiktok,
        telegram,
        startDateMembership,
        endDateMembership
    } = req.query;

    const schema = {
        id: {type: "string", uuid: true, optional: true},
        name: {type: "string", optional:true},
        username: {type: "string", optional: true},
        email: {type:"email", optional: true},
        phone: {type:"string", min:10, optional: true},
        proffesion: {type: "string", min: 2, optional: true},
        instagram: {type: "string", min: 1, optional: true},
        tiktok: {type: "string", min: 1, optional: true},
        telegram: {type: "string", min: 1, optional: true},
        startDateMembership: {type: "number", optional:true},
        endDateMembership: {type: "number", optional:true}
    }

    const validate = v.validate(req.query, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        const where = {};

        if (id) where.id = id;
        if (name) where.name = {[Op.like]: `%${name}%`};
        if (username) where.username =  {[Op.like]:`${username}%`};
        if (email) where.email = email;
        if (phone) where.phone = phone;
        if (proffesion) where.proffesion = proffesion;
        if (instagram) where.instagram = instagram;
        if (tiktok) where.tiktok = tiktok;
        if (telegram) where.telegram = telegram;
        if (startDateMembership) where.startDateMembership = startDateMembership;
        if (endDateMembership) where.endDateMembership = endDateMembership

        const user = await Users.findAll({
            where,
            attributes: { exclude: ['password'] }
        });

        return res.json({
            status: "Success",
            data: user
        });

    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}