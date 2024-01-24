const fs = require('fs');
const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param AnunciosGuardadosEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (AnunciosGuardadosEntity) {
    return await model.AnunciosGuardados.create({

        ID_SavedAd:null,
        LibraryID: AnunciosGuardadosEntity.LibraryID,
        Active: AnunciosGuardadosEntity.Active,
        Estatus: AnunciosGuardadosEntity.Estatus,
        PostDT: AnunciosGuardadosEntity.PostDT,
        AdMedia: AnunciosGuardadosEntity.AdMedia,
        FK_PlatformID: 1, 
        FK_UserID: AnunciosGuardadosEntity.FK_UserID,
        FK_Category_Code: AnunciosGuardadosEntity.FK_Category_Code,
        FanPageName:  AnunciosGuardadosEntity.FanPageName,
        AdDescription:  AnunciosGuardadosEntity.AdDescription,
        ahref: AnunciosGuardadosEntity.ahref,
        CTA_Text: AnunciosGuardadosEntity.CTA_Text,
        CTA_Type: AnunciosGuardadosEntity.CTA_Type,
        Duplicated:AnunciosGuardadosEntity.Duplicated,
        AdTitle:  AnunciosGuardadosEntity.AdTitle,
        AdCreative:  AnunciosGuardadosEntity.AdCreative

    });
}

execute.getUserAds = async function (UserID) {
    console.log("estoy en getUserAds")
    return await model.AnunciosGuardados.findAll({
        where: {FK_UserID: UserID}
    });
}

//obtener anuncio por LibraryID
execute.getAdsByLibraryID = async function (LibraryID){
    return await model.AnunciosGuardados.findOne({
        where: {LibraryID: LibraryID}
    })
}

// obtener solo los anuncios activos para un usuario
execute.getUserActiveAds = async function (UserID) {
    console.log("estoy en getUserActiveAds")
    return await model.AnunciosActivos.findAll({
        where: {FK_UserID: UserID}
    });
}



// obtener solo los anuncios activos con categoria para un usuario
execute.getUserActiveAdsCat = async function (UserID, Category_Code) {
    console.log("estoy en getUserActiveAdsCat")
    return await model.AnunciosActivos.findAll({
        where: {FK_UserID: UserID, FK_Category_Code:Category_Code}
    });
}



//delete an advertisement.
execute.delete = async function(IDSavedAd){

    console.log("estoy borrando un anuncio")
      return  await model.AnunciosGuardados.update({Active: 0}, {
            where: {ID_SavedAd: IDSavedAd}
        })

}

//Update advertisement details
execute.updateAdDetails = async function(LibraryID, FK_ID_AdDetails){

    console.log("estoy actualizando los detalles del anuncio")
      return  await model.AnunciosGuardados.update({FK_ID_AdDetails: FK_ID_AdDetails}, {
            where: {LibraryID: LibraryID, Active: 1}
        })

}

//Update url for creative and profile picture
execute.updateURLsMedia = async function(LibraryID, UserID, URLsUpdated){
    let response = {}
    response.error = false
    response.message = ""
    //cargamos el registro
    var anuncioToUpdate   =  await model.AnunciosGuardados.findOne({
        where: {LibraryID: LibraryID, FK_UserID: UserID, Active : 1}
    });
    
    //actualizamos las tablas
    try { 
        var updatedDT = new Date()
        var updateAnunciosGuard =  await model.AnunciosGuardados.update({AdCreative: URLsUpdated.AdCreative, Plataformas: updatedDT.toString()}, {
                where: {LibraryID: anuncioToUpdate.LibraryID, FK_UserID : anuncioToUpdate.FK_UserID}
        })
        
        //actualizamos el cmapo video_hd_url de AdsDetails si viene el video
        if(anuncioToUpdate.AdMedia == 'video'){
        
            var updateAdDetails   =  await model.AdsDetails.update({video_hd_url: URLsUpdated.AdCreative }, {
                where: {ID_AdDetails: anuncioToUpdate.FK_ID_AdDetails}
            }) 

        } 

            
        var updateFanPage = await model.FanPages.update({page_profile_picture_url: URLsUpdated.page_profile_picture_url}, {
            where: {FK_ID_SavedAd: anuncioToUpdate.ID_SavedAd}
        })
    } catch(error){
        response.error = true
        response.message = error.message
        fs.writeFileSync('log.txt', response.message);

    }

    return response
}



// update ad category to Todas
execute.updateCat = async function(Current_Category_Code, New_Category_Code){

    console.log("estoy actualizando la categoria de un anuncio")
      return  await model.AnunciosGuardados.update({FK_Category_Code: New_Category_Code}, {
            where: {FK_Category_Code: Current_Category_Code}
        })

}

execute.assignCatToAd = async function (Ads_Id, New_Category_Code){

    console.log("estoy asignando la categoria de un anuncio")
    return  await model.AnunciosGuardados.update({FK_Category_Code: New_Category_Code}, {
        where: {ID_SavedAd: Ads_Id}
    })


}


/**
 * Obtener la información de un Issue or Suggestion
 * @param ID_SavedAd
 * @returns {Promise<*>}
 */
execute.getSavedAd = async function (ID_SavedAd) {
    return await model.AnunciosGuardados.findOne({
        where: {ID_SavedAd: ID_SavedAd}
    });
}
module.exports = execute