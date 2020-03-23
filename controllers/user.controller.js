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
        username: req.body.username
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
        
        if(user){
            res.send({
                message: `Usuario con ID ${idUser} eliminado con éxtio`
            });
        }
        else{
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

exports.createUser = createUser;
exports.findAllUser = findAllUser;
exports.findUserById = findUserById;
exports.deleteUser = deleteUser;