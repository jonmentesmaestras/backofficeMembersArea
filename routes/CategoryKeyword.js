var express = require('express');
var router = express.Router();
var AuthSvc = require('../domain/services/AuthSvc')
const errorStruct = require('../domain/entity/ErrorStructure');
const KeywordsCategoryEntity = require('../domain/entity/KeywordsCategoryEntity');
const KeywordsCategoryModel = require('../domain/models/KeywordsCategoryModel')
var theToken = require('../users/userTokens');
const { Keywords } = require('../model');
const KeywordsEntity = require('../domain/entity/KeywordsEntity');


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


            
        let newKeywordCategoryObj = new KeywordsCategoryEntity
        newKeywordCategoryObj.KeywordCatCode = getKeywordCatCode(req.body.KeywordCatDescr, isValidToken.FK_UserID)
        newKeywordCategoryObj.KeywordCatDescr = req.body.KeywordCatDescr
       

        let resultSave = await KeywordsCategoryModel.store(newKeywordCategoryObj)
        
        response.message = "Se ha creado el registro con éxito.";
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


router.get('/', async (req, res, next) => {
    let response = {};

    let token = req.query.token
    let cat_code = req.query.cat_code
    console.log("the token is " + token)

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
        
        //response.data = await suggestionModel.getUserIssuesSuggestions(userEntity.user)
        response.data = await KeywordsModel.getAllUserKeywordsCat(isValidToken.FK_UserID )


    } catch (e) {
        console.log(e)
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(response.code)
    }
    return res.json(response)
})

function getKeywordCatCode(KeywordCatDescr, UserID){
    var primeros10Caracteres = cadena.substring(0, 10);
    
    // Retorna el resultado
    return primeros10Caracteres + "-" + UserID;
}

module.exports = router;