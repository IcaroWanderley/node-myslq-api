const models = require('../models');

async function test(req, res) {
    try {
        const user = await models.User.findByPk(7, {
            include: [models.Post]
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports = {
    test: test
};