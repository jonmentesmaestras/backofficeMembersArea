var theToken = require('../users/userTokens')

let token = "galuocsusercbxg7dse6"

async function valTokent() {

  let isValidToken = await theToken.isValidToken(token)
  
  console.log(isValidToken)


}


theToken.isValidToken(token)
.then(result=>{
  console.log(result)
})
.catch((reason)=>{
  console.log(reason)
})



