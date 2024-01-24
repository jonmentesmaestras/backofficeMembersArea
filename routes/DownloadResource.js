var express = require('express');
var router = express.Router();
const axios = require('axios');


router.get('/', async (req, res, next) => {
    
    // the url must be encoded
    // console.log("req.query.url ", req.query.url )
   
    let resp = {}
    resp.message = ""
    resp.error = false
    

    try {
        // Replace 'RESOURCE_URL' with the actual URL of the resource you want to download
        const resourceUrl = req.query.url   //'https://scontent-bog1-1.xx.fbcdn.net/v/t42.1790-2/415734632_378589331381079_2570600030341894433_n.?_nc_cat=107&ccb=1-7&_nc_sid=c53f8f&_nc_eui2=AeHnHmPpWJ4EbuOkQNlZBrDaRxHkAlfwOflHEeQCV_A5-R2alaf0vs1dtEiQIyXaECemA74wzsTR-m8B63aDERWk&_nc_ohc=c0qw4sKPW9cAX_ruRrz&_nc_ht=scontent-bog1-1.xx&oh=00_AfBTfzF5g7UT8cfqc8pGHNkvjF6xfGW2ubZtP6Ecld3aEw&oe=659D6E86';

        // Fetch the resource
        const response = await axios.get(resourceUrl, { responseType: 'arraybuffer' });
        
        // Set the appropriate content type based on the resource extension or MIME type
        const contentType = 'video/mp4'; // Change this based on your resource type

        // Set response headers
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', response.data.length);
        res.setHeader('Content-Disposition', 'attachment; filename=downloaded_resource.mp4');

        // Send the resource data
        res.end(response.data);

    } catch (e) {
        console.error(e);
        resp.message = e.message
        resp.error = true
        res.statusCode = 500;
        res.end('No se puede descargar el recurso.');
    }
   
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