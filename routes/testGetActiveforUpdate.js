const AnunciosGuardadosModel = require('../domain/models/AnunciosGuardadosModel')

async function getActiveAds(){
    var myAds = await AnunciosGuardadosModel.getUserActiveAds(26)
    console.log(myAds)
}

getActiveAds()



//update the URL
//var myupdatedJson =  checkExpiredURL(myAds)

