require('dotenv').config()


const { CourseCategory } = require('../../../../sequelize/models');

module.exports = async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: "id course category not exists"
        });
    }

    try {
        const courseCategory = await CourseCategory.findByPk(id)

        if (!courseCategory) {
            return res.status(400).json({
                status: 'error',
                message: "Course Category not exists"
            });
        }

        await courseCategory.destroy();

        return res.json({
            status: 'success',
            message: "delete course category successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
