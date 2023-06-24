require('dotenv').config()


const { Category } = require('../../../sequelize/models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')
const v = new Validator();

module.exports = async (req, res, next) => {
    try{
        const { id, name, parent} = req.query;

        let where = {};

        // Find by id
        if (id) {
            where.id = id;
        }

        // Find by name
        if (name) {
            where.name = {[Op.like]: `%${name}%`};
        }

        // Find by parent
        if (parent) {
            where.parentCategory = parent;
        }

        const category = await Category.findAll({where});

        return res.json({
            status: 'success',
            data: category
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        })
    }

}
