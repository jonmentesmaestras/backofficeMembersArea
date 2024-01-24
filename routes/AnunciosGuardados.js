var express = require('express');
var router = express.Router();
var AuthSvc = require('../domain/services/AuthSvc')
const errorStruct = require('../domain/entity/ErrorStructure');

const AnunciosGuardados = require('../domain/entity/AnunciosGuardadosEntity');
const AnunciosGuardadosModel = require('../domain/models/AnunciosGuardadosModel')

const meta = require('../domain/services/MetaAPISvc')

var theToken = require('../users/userTokens')


//guarda el anuncio
router.post('/', async (req, res, next) => {
    let response = {};
    response.error = false;
    response.status = 200;
    let token = req.headers.token
    console.log("the token is " + token)
    let error = new errorStruct

    try {
        
        //verify if the token is  null
        if(!token){
            res.setHeader('WWW-Authenticate', 'Basic');
            
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
            error.message = `Invalid Token`
            throw error;

        }

        //comprobar que este anuncio no ha sido guardado

        let verifiedAdInDB = await verifyAdsInDB(req.body.LibraryID)
        if(verifiedAdInDB.verifiedAd !== null){
            error.code = 500;
            error.message = `Este Anuncio lo has guardado anteriormente: ${req.body.LibraryID}`
            throw error;
        }

      

        var fieldValues = {
            LibraryID: req.body.LibraryID,
            Active: req.body.Active,
            Estatus: req.body.Estatus,
            PostDT: req.body.PostDT,
            AdMedia: req.body.AdMedia,
            FK_UserID: isValidToken.FK_UserID,
            Plataformas: req.body.Plataformas,
            FanPageName: req.body.FanPageName,
            AdDescription: req.body.AdDescription,
            ahref: req.body.ahref,
            CTA_Text: req.body.CTA_Text,
            CTA_Type: req.body.CTA_Type,
            Duplicated:req.body.Duplicated,
            AdTitle: req.body.AdTitle,
            AdCreative: req.body.AdCreative

        }
        console.log("fieldvalues are ", fieldValues)


    
        let newAnunciosSavedObj = new AnunciosGuardados;
        newAnunciosSavedObj.FK_UserID = fieldValues.FK_UserID; 
        newAnunciosSavedObj.LibraryID= fieldValues.LibraryID
        newAnunciosSavedObj.Active= fieldValues.Active
        newAnunciosSavedObj.Estatus= fieldValues.Estatus
        newAnunciosSavedObj.PostDT= fieldValues.PostDT
        newAnunciosSavedObj.AdMedia= fieldValues.AdMedia
        newAnunciosSavedObj.Plataformas= fieldValues.Plataformas
        newAnunciosSavedObj.FanPageName= fieldValues.FanPageName
        newAnunciosSavedObj.AdDescription= fieldValues.AdDescription
        newAnunciosSavedObj.ahref = fieldValues.ahref
        newAnunciosSavedObj.CTA_Text= fieldValues.CTA_Text
        newAnunciosSavedObj.CTA_Type= fieldValues.CTA_Type
        newAnunciosSavedObj.Duplicated= fieldValues.Duplicated
        newAnunciosSavedObj.AdTitle= fieldValues.AdTitle
        newAnunciosSavedObj.AdCreative= fieldValues.AdCreative  
        

        let resultSave = await AnunciosGuardadosModel.store(newAnunciosSavedObj)
        response.message = "Se ha creado el registro con exito.";
        response.data = resultSave;

        delete resultSave.dataValues.FK_UserID;

        //obtener los detalles desde Meta API y guardarlos
        let savedAdDetails = await meta.saveAdDetails(fieldValues.LibraryID )
        if(savedAdDetails.error){
            error.message = savedAdDetails.message
            
            throw error
        }
        

        
    } catch (e) {
        console.log("Error insertando ")
        console.log("el error es", e)
        response.error = e.error;
        response.message ="Error insertando " + e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(500)
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
        var myAds = await AnunciosGuardadosModel.getUserActiveAds(isValidToken.FK_UserID)
        
        //update the URL for creatives and profile picture
        var myupdatedJson = await checkExpiredURL(myAds, isValidToken.FK_UserID)

        


       

        
        //TODO: toca checkExpire solito para profile picture y update de todo en la db
        response.data = myupdatedJson
     

        

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

router.get('/id/:uuid', async (req, res, next) => {
    let response = {};
    response.error = false;
    response.status = 200;
    response.message = "success";
    try {

        // Iniciar session o comprobar el usuario.
        const userEntity = await AuthSvc.init(req, res, next);
        if (userEntity.error) {
            throw userEntity
        }
        // Obtener los issues and suggestion del usuario.
        const idIssuesSuggestion = req.params.uuid;
        let result = await suggestionModel.getIssuesSuggestionsId(idIssuesSuggestion)
        console.log(result);
        if (!result) {
            const error = new errorStruct;
            error.code = 404;
            error.message = `No se ha encontrado registro para '${idIssuesSuggestion}'.`
            throw error;
        }
        response.data = result;
    } catch (e) {
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(e.code)
    }
    return res.json(response)
})

//delete advertisements
router.delete('/', async (req, res, next) => {
    let response = {};
    response.error = false;
    response.status = 200;
    
    console.log(req.body.Id_ad)

    try {

        let resultSave = await AnunciosGuardadosModel.delete(req.body.Id_ad)
        
        response.message = "Se ha actualizado el registro active = 0 con exito.";
        response.data = "ok";
        response.code = "200";
        response.message = "Success";          

        
    } catch (e) {
        console.log("Error borrando ")
        console.log(e)
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(e.code)
    }
    return res.json(response)
})



// assign category to an ad
router.put('/', async (req, res, next) => {
    
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

async function verifyAdsInDB(LibraryID){
    let response = {}
    response.message = ""
    response.error = false
    response.verifiedAd = null
    let adInDB = null
    try{
         adInDB = await AnunciosGuardadosModel.getAdsByLibraryID(LibraryID)
         response.verifiedAd = adInDB
    } catch(error){
        response.error = true
        response.message = "error consultado AnunciosGuardados: " + error.message
    }
    return response

}


async function checkExpiredURL(jsonArray, UserID) {
    console.log("the userID is " + UserID)
    var currentURL = ""
    var updatedJson = jsonArray
    var isCreativeURLExpire = false
    var isProfilePictExpire = false
    var URLsUpdated = {}
    // Iterate over each object in the array
    for (let i = 0; i < updatedJson.length; i++) {
        
      // Check if the "AdCreative" property exists in the current object
      if ("AdCreative" in updatedJson[i]) {
        //console.log("proceed")
        // get the current url
        var urlCreative = updatedJson[i].AdCreative
        
        // si esta expirada la url del creativo toca renovar la url
        if(isURLExpired(urlCreative)){
            isCreativeURLExpire = true
            
          
          var updatedURLs = await meta.updateAdDetails(updatedJson[i].LibraryID, updatedJson[i].AdMedia) 
            
          updatedJson[i].AdCreative = updatedURLs.URLCreative
          
          updatedJson[i].page_profile_picture_url = updatedURLs.profilePict
          
        } 

        // si esta expirada la url de la foto de perfil toca renovar la url
        var urlProfilePict = updatedJson[i].page_profile_picture_url
        if(isURLExpired(urlProfilePict)){
          isProfilePictExpire = true
          var updatedURLs = await meta.updateAdDetails(updatedJson[i].LibraryID, updatedJson[i].AdMedia) 
          updatedJson[i].page_profile_picture_url = updatedURLs.profilePict
          updatedJson[i].AdCreative = updatedURLs.URLCreative
          
  
        }
        
        //si hay algo que actualizar en las urls de creativos o pagina de perfil, lo hacemos aquí
        if(isCreativeURLExpire || isProfilePictExpire){
            
            URLsUpdated.page_profile_picture_url = updatedJson[i].page_profile_picture_url
            URLsUpdated.AdCreative = updatedJson[i].AdCreative

           var updatedTables = await AnunciosGuardadosModel.updateURLsMedia(updatedJson[i].LibraryID, UserID, URLsUpdated)
           
           if(updatedTables.error){
                return updatedTables
           }
        }
  
         
      }//if the adcreative exist in json
      
    }//end for
  
    return updatedJson 
    
  }

function isURLExpired(currentURL){
    //encontrar el oe=XXXXXXXXX
    let match = currentURL.match(/oe=\w+/);
    let oeRaw = match[0] // the current expire date in hexa
    let hex   = oeRaw.substring(3, 11)
    
    //el tiempo de expiración de la url  en segundos
    let expireDecimal = hexToDecimal(hex);

    let date = new Date();
    //el tiempo actual
    let todayDecimal = dateToSeconds(date);
        
    // si esta expirada toca renovar la url
    if(expireDecimal < todayDecimal){
        return true
    } else {
        return false
    }

}

function hexToDecimal(hex) {
    return parseInt(hex, 16);
}

function dateToSeconds(date) {
    return Math.floor(date.getTime() / 1000);
}

module.exports = router;