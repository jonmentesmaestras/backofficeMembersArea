var model = require('../model')

let token = "galuocsusercbxg7dse6"

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

deActivateUserTokens(1)


