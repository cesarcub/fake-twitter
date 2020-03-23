const dbManager = require('../database/db.manager');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function getMessageUsers(req, res) {
    try {
        const { idReceptor } = req.params;
        const messages = await dbManager.Message.findAll({
            attributes: ['message', 'createdAt', 'updatedAt'],
            include: {
                model: dbManager.User,
                attributes: ['username']
            },
            where: {
                idUserReceptor: idReceptor
            }
        });
        res.send({
            messages
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error interno al traer mensajes' });
    }
}

async function sendMessage(req, res) {
    try {
        const newMessage = {
            message: req.body.message,
            idUserEmisor: req.body.idUserEmisor,
            idUserReceptor: req.body.idUserReceptor
        }

        const message = await dbManager.Message.create(newMessage);

        res.send(message);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error interno al enviar mensaje' });
    }
}

exports.getMessageUsers = getMessageUsers;
exports.sendMessage = sendMessage;