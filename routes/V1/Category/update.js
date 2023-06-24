require('dotenv').config()


const { Category } = require('../../../sequelize/models')
const Validator = require('fastest-validator')
const { Op } = require('sequelize');
const v = new Validator();

module.exports = async (req, res, next) => {

    const schema = {
        id: { type: "string", uuid: true},
        name: {type: "string", min: 3, optional:true},
        description: {type: "string", optional: true},
        parentCategory: {type: "string", uuid: true, optional: true}
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        // Is name of category in that store already exists
        if (req.body.name) {
            let category = await Category.findOne({
                where: {
                    name: req.body.name,
                    id: { [Op.not]: req.body.id },
                }
            });

            if (category) {
                return res.status(400).json({
                    status: 'error',
                    message: "Category already exists"
                });
            }
        }

        if (req.body.parentCategory) {

            if (req.body.parentCategory === req.body.id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'category cannot be the same'
                });
            }

            let parentCategory = await Category.findByPk(req.body.parentCategory);

            if (!parentCategory) {
                return res.status(400).json({
                    status: 'error',
                    message: "Category not exists"
                });
            }
        }

        // Update Category if no error present
        const category = await Category.findByPk(req.body.id);
        category.name= req.body?.name ? req.body.name : category.name;
        category.description = req.body?.description ? req.body.description : category.description;
        category.parentCategory = req.body?.parentCategory ? req.body.parentCategory : category.parentCategory;
        await category.save();

        return res.json({
            status: 'success',
            data: category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
