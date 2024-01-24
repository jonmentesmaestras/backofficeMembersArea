const AnunciosGuardadosModel = require('../domain/models/AnunciosGuardadosModel')

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

verifyAdsInDB("371003985274516")
.then(result => {
    if(result.verifiedAd !== null){
        console.log("Este Anuncio lo has guardado anteriormente.")
    } else {
        console.log("continue guardando")
    }
})
.catch(error => console.log(error))
