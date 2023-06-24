require('dotenv').config()


const { CourseSection } = require('../../../../sequelize/models');

module.exports = async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: "id course section not exists"
        });
    }

    try {
        const courseSection = await CourseSection.findByPk(id)

        if (!courseSection) {
            return res.status(400).json({
                status: 'error',
                message: "Course not exists"
            });
        }

        await courseSection.destroy();

        return res.json({
            status: 'success',
            message: "delete course section successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
