require('dotenv').config()


const { Category } = require('../../../sequelize/models');

module.exports = async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: "id category not exists"
        });
    }

    try {
        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(400).json({
                status: 'error',
                message: "Category not exists"
            });
        }

        await category.destroy();

        return res.json({
            status: 'success',
            message: "delete category successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
