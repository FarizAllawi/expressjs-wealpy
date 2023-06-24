require('dotenv').config()


const { Users } = require('../../../../sequelize/models');

module.exports = async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            status: 'error',
            message: "id users not exists"
        });
    }

    try {
        const users = await Users.findByPk(id)

        if (!users) {
            return res.status(400).json({
                status: 'error',
                message: "Users not exists"
            });
        }

        await users.destroy();

        return res.json({
            status: 'success',
            message: "delete user successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Service Unavailable'
        });
    }

}
