require('dotenv').config()


const { CourseWatched } = require('../../../../sequelize/models');

module.exports = async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: "id course watched not exists"
        });
    }

    try {
        const courseWatched = await CourseWatched.findByPk(id)

        if (!courseWatched) {
            return res.status(400).json({
                status: 'error',
                message: "Course Watched not exists"
            });
        }

        await courseWatched.destroy();

        return res.json({
            status: 'success',
            message: "delete course watched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
