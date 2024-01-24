const model = require('../model')

const validateToken = async function(){
    
    //validamos el token
    let token = "galuocsusercbxg7dse6"
    const validToken = await model.UserTokens.findOne({
        where: {Token:token }
    })

    const parsedDate = Date.parse(validToken.Expires);
    const dateObject = new Date(parsedDate);
    
    if(dateObject > Date.now()) {
        console.log("Token valido")
    } else {
        console.log("Token expirado" + dateObject); 
    }

}

validateToken()