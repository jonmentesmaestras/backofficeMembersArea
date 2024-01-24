var AuthSvc = require('../domain/services/AuthSvc')
const errorStruct = require('../domain/entity/ErrorStructure');
const userTokens = require('../domain/entity/UserTokensEntity');
const UserTokensModel = require('../domain/models/UserTokensModel')
const model = require('../model')
var tokens = {}

tokens.createToken = async function (UserID) {
    
    let response = {};
    response.error = false;
    response.status = 200;

    try {

        
        // create token and set expiration to 1 hour in the future
        var tokenId = createRandomString(20)
       // const expi = Date.now() + 10 * 1000 * 60 * 60;
        const expi = Date.now() +  1000 * 60 ;
        const date = new Date(expi);
        const formattedDate = date.toISOString();
        
        // deactivate all tokens for this user
        let isInactiveTokens = deActivateUserTokens(UserID)

        if((await isInactiveTokens).error){
            throw new Error(isInactiveTokens.message); 
        }

        let newUserTokenObj = new userTokens
        
        newUserTokenObj.FK_UserID  = UserID 
        newUserTokenObj.Token = tokenId
        newUserTokenObj.Active = true
        newUserTokenObj.Expires = formattedDate

        let resultSave = await UserTokensModel.store(newUserTokenObj)
        delete resultSave.dataValues.FK_UserID;
        response.token = newUserTokenObj.Token
        response.message = "Se ha creado el registro con exito.";
        response.data = resultSave;
        
    } catch (e) {
        console.log("Error insertando ")
        console.log(e)
        response.error = false;
        response.status = 403;        
    }
    return response
}

tokens.isValidToken = async function(token){
        try{
            var response = {
                        FK_UserID: 0,
                        error: false,
                        message: ""
                    }
            console.log("start")
            //validamos el token
            const validToken = await model.UserTokens.findOne({
                where: {Token:token,  Active:1  }
            })
            
            //no encuentra el token
            if(validToken === null){
                throw new Error('El Token no existe')
            }

            console.log("the validtoken is " )
            const parsedDate = Date.parse(validToken.Expires);
            const dateObject = new Date(parsedDate);
            console.log("la fecha creada con la base de datos es " +dateObject)
            
            if(dateObject > Date.now()) {
                //valid token
                console.log("it is valid token")
                response.message = "it is valid token"
                response.FK_UserID = validToken.FK_UserID
                return response
            } else {
                //expired token
                console.log("it is not valid token")
                throw new Error('it is not valid token')
            }
        } catch (e) {
            response.message = e.message
            response.error = true
            return response;
            
        }
 
}


 function createRandomString (strLength){
    var possibleCharacters = 'abcdefghiklmnopqrstuvwxyz0123456789'

    // Start the final string
    var str = ''
    for(i=1;i<=strLength;i++){
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random()*possibleCharacters.length))
        str+= randomCharacter
    }

    return str


}

async function deActivateUserTokens(UserID) {
    var response = {error:false, message:""}
   try{

        // deactivate all tokens for this user
        const userTokens = await model.UserTokens.findAll({
            where: {FK_UserID:UserID }
        })
        
        // Update each record in the userTokens array
        for (const tokenRecord of userTokens) {
            // Update the "Active" field to 0
            await tokenRecord.update({ Active: 0 });
        }
        
        return response

   } catch(e){
        response.error = true
        response.message = e
        return response

   } 
 
 }



module.exports = tokens;