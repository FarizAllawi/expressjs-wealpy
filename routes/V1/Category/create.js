require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const { Category } = require('../../../sequelize/models')
const Validator = require('fastest-validator')
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        name: {type: "string", min: 3},
        description: {type: "string", optional: true},
        parentCategory: {type: "string", uuid: true, optional: true}
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        // Is name of category in that store already exists
        const category = await Category.findOne({
            where: {
                name: req.body.name
            }
        });

        if (category) {
            return res.status(400).json({
                status: 'error',
                message: "Category already exists"
            });
        }

        if (req.body.parentCategory) {
            let parentCategory = await Category.findByPk(req.body.parentCategory);

            if (!parentCategory) {
                return res.status(400).json({
                    status: 'error',
                    message: "Category not exists"
                });
            }
        }

        // Create Category if no error present
        const createdCategory = await Category.create({
            name: req.body.name,
            description: req.body?.description ? req.body.description : null,
            parentCategory: req.body?.parentCategory ? req.body.parentCategory : null,
        });

        return res.json({
            status: 'success',
            data: createdCategory
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }
}
