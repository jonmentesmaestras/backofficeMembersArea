var theToken = require('./userTokens')

async function testToken(token){

    let isValidToken = await theToken.isValidToken(token)  
    console.log("response " + JSON.stringify(isValidToken))

    return isValidToken
}

testToken('8oi4dd3ey6puur2y4b2s')


