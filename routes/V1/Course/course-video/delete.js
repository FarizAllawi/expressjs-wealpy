require('dotenv').config()


const { CourseVideo } = require('../../../../sequelize/models');

module.exports = async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: "id course video not exists"
        });
    }

    try {
        const courseVideo = await CourseVideo.findByPk(id)

        if (!courseVideo) {
            return res.status(400).json({
                status: 'error',
                message: "Course Video not exists"
            });
        }

        await courseVideo.destroy();

        return res.json({
            status: 'success',
            message: "delete course video successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
