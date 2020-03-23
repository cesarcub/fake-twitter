const dbManager = require('../database/db.manager');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function createUser(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: 'Request is empty'
        });
        return;
    }

    const newUserObject = {
        username: req.body.username,
        password: req.body.password
    }

    dbManager.User.create(newUserObject).then(data => {

        res.send(data);

    }).catch(error => {
        console.log(error);
        res.status(500).send({
            message: 'Internal server error'
        })
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function findAllUser(req, res) {
    try {
        const allUsers = await dbManager.User.findAll();

        res.send({
            data: allUsers
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error interno al traer usuarios'
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function findUserById(req, res) {
    try {
        const { idUser } = req.params;
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });

        res.send({
            data: user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error interno al traer usuario'
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function deleteUser(req, res) {
    try {
        const { idUser } = req.params;
        const user = await dbManager.User.destroy({
            where: {
                idUser: idUser
            }
        });

        if (user) {
            res.send({
                message: `Usuario con ID ${idUser} eliminado con éxtio`
            });
        }
        else {
            res.status(404).send({
                message: 'Usuario no existe'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error interno al eliminar usuario'
        });
    }
}

/**
 * 
 * @param {*} res 
 * @param {*} req 
 */
async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await dbManager.User.findOne({
            where: {
                username,
                password
            }
        });

        res.send({
            authenticate: user ? true : false
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error interno al hacer login'
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function listFollowers(req, res) {
    try {
        const { idUser } = req.params;
        const followers = await dbManager.User.findOne({
            attributes: ['username'],
            include: {
                attributes: ['username'],
                model: dbManager.User,
                as: 'Followers'
            },
            where: {
                idUser: idUser
            }
        });
        res.send(followers);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error interno al traer seguidores'
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function createFollower(req, res) {
    try {
        const { idUser, FollowerIdUser } = req.body;

        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });
        const follower = await user.addFollower(FollowerIdUser);
        res.send(follower);
    } catch (error) {
        res.status(500).send({
            message: 'Error interno al crear seguidor'
        });
    }
}

exports.createUser = createUser;
exports.findAllUser = findAllUser;
exports.findUserById = findUserById;
exports.deleteUser = deleteUser;
exports.login = login;
exports.listFollowers = listFollowers;
exports.createFollower = createFollower;