const dbManager = require('../database/db.manager');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function createTweet(req, res) {
    try {
        const { message, idUser } = req.body;
        const newTweet = {
            message,
            idUser
        }

        const tweet = await dbManager.Post.create(newTweet);

        res.send(tweet);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error interno al crear tweet' });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function listTweet(req, res) {
    try {
        const tweets = await dbManager.Post.findAll();
        res.send({
            tweets
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error interno al traer tweets' });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function deleteTweet(req, res) {
    try {
        const { idTweet } = req.params;
        const tweet = await dbManager.Post.destroy({
            where: {
                idPost: idTweet
            }
        });
        if (tweet) {
            res.send({
                message: `Tweet con ID ${idTweet} eliminado`
            });
        }
        else {
            res.status(404).send({
                message: 'Tweet no existe'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error interno al borrar tweet'
        });
    }
}

exports.createTweet = createTweet;
exports.listTweet = listTweet;
exports.deleteTweet = deleteTweet;