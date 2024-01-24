const user = require('./../users')
const accesoTemporalEntity = require('../domain/entity/AccesoTemporalEntity')
const errorStruct = require('../domain/entity/ErrorStructure');
const persistence = require('./../persistence');
const email = require("./../email");

var forgot = {}

/**
 * Método para recuperar o cambiar la contraseña del usuario
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
forgot.recover = async function (req, res) {
    var response = {};

    try {
        let userEmail = req.body.email;
        userObject = await user.checkEmail(userEmail);
        if (!userObject) {
            const error = new errorStruct;
            error.code = 404;
            error.message = `The user ${userEmail} is not registered in the system.`
            throw error;
        }

        // Inicializar la entidad que configura las propiedades necesarias para restablecer la contraseña.
        temporalObject = new accesoTemporalEntity;
        temporalObject.FK_UserID = userObject.UserID;

        // Crear el acceso temporal para el usuario.
        const resultSave = await persistence.createTemporalAccess(temporalObject);
        // Crear el link para acceder a restablecer la contraseña.
        // const linkForgot = "http://localhost:3000/changePassword?id=" + resultSave.LinkID;
        const linkForgot = "http://localhost:3000/asignarPassword.html?id=" + resultSave.LinkID;
        // Enviar el link vía email
        email.send(userObject.Email, "Restablece tu contraseña", linkForgot);
        response.data = `Se ha enviado un correo electrónico a ${userEmail}.\n Por favor, revisa tu correo, y sigue las instrucciones para asignar una nueva contraseña.`;
        response.code = "200";
        response.message = "Success";

    } catch (e) {
        const errorResp = errorFunction(e)
        response.error = errorResp.error;
        response.message = errorResp.message;
        response.status = errorResp.status;
        res.status(errorResp.status)
    }
    return res.json(response)
}

/**
 * Método para atrapar errores, este método debería convertirse en un servicio
 * @param e
 * @returns {{}}
 */
function errorFunction(e) {
    let struct = {};
    if (e instanceof errorStruct) {
        struct.message = e.message;
        struct.status = e.code;
    } else if (e instanceof TypeError || e instanceof ReferenceError) {
        struct.message = e.message
        struct.status = 500;
    } else {
        struct.message = e;
        struct.status = 402;
    }
    struct.error = true;
    return struct;
}

module.exports = forgot;
