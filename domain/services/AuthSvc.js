const user = require('./../../users');
const userEntity = require('./../entity/UserEntity');
const errorStruct = require('./../entity/ErrorStructure');

module.exports = class AuthSvc {

    static async init(req, res, next) {
        var response = {};
        try {

            let authHeader = req.headers.authorization;
            if (!authHeader) {
                res.setHeader('WWW-Authenticate', 'Basic');
                let error = new errorStruct;
                error.code = 401;
                error.message = `Error en la autenticación.`
                throw error;
            }

            const auth = new Buffer.from(authHeader.split(' ')[1],
                'base64').toString().split(':');

            let userEntityObject = new userEntity();
            userEntityObject.Email = auth[0];
            userEntityObject.Password = auth[1];

            userEntityObject = await this.initSession(userEntityObject)

            if (!userEntityObject) {
                let error = new errorStruct;
                error.code = 404;
                error.message = `The user ${auth[0]} is not registered in the system.`
                throw error;
            }

            response.user = userEntityObject;

        } catch (e) {
            response.error = true;
            response.message = e.message;
            response.status = e.status;
            response.code = e.code;
            res.status(e.code)
        }
        return response;
    }

    static async initSession(userEntityObject) {
        return await user.startSession(userEntityObject);
    }

}