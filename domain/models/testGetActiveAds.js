const AnunciosGuardadosModel = require('./AnunciosGuardadosModel')

async function getAds(){
 var anuncios =  await AnunciosGuardadosModel.getUserActiveAds(26)
 console.log("anuncios", anuncios)
}
 