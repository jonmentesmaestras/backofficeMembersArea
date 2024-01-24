var express = require('express');
var router = express.Router();
var AuthSvc = require('../domain/services/AuthSvc')
const errorStruct = require('../domain/entity/ErrorStructure');

const UsuariosCategoria = require('../domain/entity/UsuariosCategoriaEntity');
const UsuariosCategoriaModel = require('../domain/models/UsuariosCategoriaModel')
const AdsCategoryModel = require('../domain/models/AdsCategoryModel')

const AnunciosGuardados = require('../domain/entity/AnunciosGuardadosEntity');
const AnunciosGuardadosModel = require('../domain/models/AnunciosGuardadosModel')
var theToken = require('../users/userTokens')


const { AdsCategory } = require('../model');


router.post('/', async (req, res, next) => {
    let response = {};
    response.error = false;
    response.status = 200;
    let token = req.headers.token
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
            error.message = `Invalid Token`
            throw error;

        }
        console.log("category name received: " + req.body.Category_Name)
        var Category_Code = substringWithoutSpaces(req.body.Category_Name, 3)
        
        console.log("category code : " + Category_Code)

        var fieldValues = {
            
            Category_Name: req.body.Category_Name,
            Category_Code: Category_Code

        }
        console.log("fieldvalues are ", fieldValues)
    
        let newCategorySavedObj = new AdsCategory
        newCategorySavedObj.Category_Code = fieldValues.Category_Code; 
        newCategorySavedObj.Category_Name= fieldValues.Category_Name
      

        let resultSave = await AdsCategoryModel.store(newCategorySavedObj)
        //delete resultSave.dataValues.FK_UserID;

        //save Usuarios Categoria

        let newfieldValues = {
            
            FK_Category_Code: Category_Code,
            FK_UserID: isValidToken.FK_UserID

        }        

        let newUsuarioCategoryObj = new UsuariosCategoria
        newUsuarioCategoryObj.FK_Category_Code = newfieldValues.FK_Category_Code
        newUsuarioCategoryObj.FK_UserID = newfieldValues.FK_UserID

        let resultUsuarioCatSave = await  UsuariosCategoriaModel.store(newUsuarioCategoryObj)
        response.message = "Se han creado los registros con exito.";
        response.dataAdsCategory = resultSave;
        response.dataUserCat = resultUsuarioCatSave
        
    } catch (e) {
        console.log("Error insertando ")
        console.log("el error es", e)
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
    let category_code = req.query.cat_code

    let token = req.query.token
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

            if (req.query.cat_code !== undefined) {
                // obtiene todos los anuncios de un usuario por categoria
                response.data = await AnunciosGuardadosModel.getUserActiveAdsCat(isValidToken.FK_UserID, category_code)
            } else {

                // obtiene todas las categorias por usuario
                response.data = await UsuariosCategoriaModel.getUsuariosCategorias(isValidToken.FK_UserID)
            }        
        
        

        

    } catch (e) {
        console.log(e)
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = 401;
        res.status(e.code)
    }
    return res.json(response)
})



//delete advertisements
router.delete('/', async (req, res, next) => {

    let token = req.headers.token

    let response = {};
    response.error = false;
    response.status = 200;
 
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
            error.message = `Invalid Token`
            throw error;

        }        

       let resultSave = await UsuariosCategoriaModel.delete(isValidToken.FK_UserID, req.body.Category_Code)

       //Update the category to Todas
       let resultAnunCatSave = AnunciosGuardadosModel.updateCat(req.body.Category_Code, "Todas") 
        
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

function substringWithoutSpaces(inputString, length) {
    let result = '';
    let count = 0;
  
    for (let i = 0; i < inputString.length && count < length; i++) {
      if (inputString[i] !== ' ') {
        result += inputString[i];
        count++;
      }
    }
    
    //prefijo numerico 3 cifras
    var numPrefix =  getRandomThreeDigitNumber()

    //prefijo alfabetico 4 letras
    var randomLettersArray = getRandomLetters();
    randomLettersArray = randomLettersArray.join('')

    //unir todo: 
    result = result+numPrefix + randomLettersArray  

    return result;
  }

  function getRandomThreeDigitNumber() {
    // Generate a random number between 0 and 1
    const randomFraction = Math.random();
  
    // Scale the random number to be between 100 and 900
    const randomNumberInRange = Math.floor(randomFraction * 800) + 100;
  
    return randomNumberInRange;
  }

  function getRandomLetters() {
    // Function to generate a random lowercase letter
    function getRandomLowercaseLetter() {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet[randomIndex];
    }
  
    // Function to generate a random uppercase letter
    function getRandomUppercaseLetter() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet[randomIndex];
    }
  
    // Generate 2 random lowercase letters
    const lowercase1 = getRandomLowercaseLetter();
    const lowercase2 = getRandomLowercaseLetter();
  
    // Generate 2 random uppercase letters
    const uppercase1 = getRandomUppercaseLetter();
    const uppercase2 = getRandomUppercaseLetter();
  
    return [lowercase1, lowercase2, uppercase1, uppercase2];
  }

module.exports = router;