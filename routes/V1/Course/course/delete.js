require('dotenv').config()


const { Course } = require('../../../../sequelize/models');

module.exports = async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: "id course not exists"
        });
    }

    try {
        const course = await Course.findByPk(id)

        if (!course) {
            return res.status(400).json({
                status: 'error',
                message: "Course not exists"
            });
        }

        await course.destroy();

        return res.json({
            status: 'success',
            message: "delete course successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
