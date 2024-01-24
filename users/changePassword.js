const errorStruct = require('../domain/entity/ErrorStructure');
const models = require("./../model");

var changePassword = {}

changePassword.execute = async function (req, res) {
    var response = {};
    try {

        // Validar el link de restablecimiento.
        let $accesoTemporalObject = await validateId(req.query.id)
        if ($accesoTemporalObject instanceof errorStruct) {
            throw $accesoTemporalObject;
        }

        // cambiar contraseña
        await models.Usuario.update({Password: req.body.key}, {
            where: {UserID: $accesoTemporalObject.FK_UserID}
        })

        response.data = "ok";
        response.code = "200";
        response.message = "Success";
    } catch (e) {
        const errorResp = errorFunction(e)
        response.error = errorResp.error;
        response.message = errorResp.message;
        response.status = errorResp.status;
    }

    return res.json(response)
}

async function validateId(linkId) {

    const exists = await models.AccesoTemporal.findOne({
        where: {LinkID: linkId}
    });
    if (exists == null) {
        const error = new errorStruct;
        error.code = 403;
        error.status = "Fail";
        error.message = `Identificador de restablecimiento de contraseña no válido.`
        return error;
    }

    let now = new Date();
    let validUntil = new Date(exists.ValidUntil);
    if (validUntil < now) {
        const error = new errorStruct;
        error.code = 403;
        error.status = "Fail";
        error.message = `El tiempo de validez de este link ha vencido. Por favor solicite uno nuevo. http://localhost:3000/forgotPassword`
        return error;
    }
    return exists;
}

function errorFunction(e) {
    console.log(e)
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

module.exports = changePassword;