var express = require('express');
var router = express.Router();
var AuthSvc = require('../domain/services/AuthSvc')
const errorStruct = require('../domain/entity/ErrorStructure');
const AnunciosGuardados = require('../domain/entity/AnunciosGuardadosEntity');
const AnunciosGuardadosModel = require('../domain/models/AnunciosGuardadosModel')
var theToken = require('../users/userTokens')


// assign category to an ad
router.post('/', async (req, res, next) => {
    
    let token = req.headers.token
    let response = {};
    response.error = false;
    response.status = 200;
    
    console.log(req.body.Id_ad)

    try {

            //verify if the token is  null
            if(!token){
                res.setHeader('WWW-Authenticate', 'Basic');
                let error = new errorStruct;
                error.code = 401;
                error.message = `Error en la autenticación.`
                throw error;
            }

            //validamos el token
            let isValidToken = await theToken.isValidToken(token)  

            if(isValidToken.error == true)
            {
                res.setHeader('WWW-Authenticate', 'Basic');
                let error = new errorStruct;
                error.code = 401;
                error.message = isValidToken.message
                throw error;

            }        


        let resultSave = await AnunciosGuardadosModel.assignCatToAd(req.body.Id_ad, req.body.cat_code)
        
        response.message = "Se ha asignado el registro con éxito.";
        response.data = "ok";
        response.code = "200";
        response.message = "Success";          

        
    } catch (e) {
        console.log("Error asignando ")
        console.log(e)
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(e.code)
    }
    return res.json(response)
})


module.exports = router;