const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param FanPagesEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (FanPagesEntity) {
    return await model.FanPages.create({

        ID_Fanpage: null,
        pageID:FanPagesEntity.pageID,
        pageName: FanPagesEntity.pageName,
        page_profile_picture_url: FanPagesEntity.page_profile_picture_url,
        page_categories: FanPagesEntity.page_categories,
        current_page_name: FanPagesEntity.current_page_name,
        page_profile_uri: FanPagesEntity.page_profile_uri,
        FK_ID_SavedAd: FanPagesEntity.FK_ID_SavedAd   

    });
}

execute.update = async function(New_Category_Name, Category_Code){

    console.log("estoy actualizando el nombre de categoria")
    return  await model.AdsCategory.update({Category_Name: New_Category_Name}, {
        where: {Category_Code: Category_Code}
    })

}

// get the categories by user
execute.getCategories = async function () {
    console.log("estoy en getUserAds")
    return await model.AdsCategory.findAll();
}

// obtener solo los anuncios activos para un usuario
/*execute.getUserActiveAds = async function (UserID) {
    console.log("estoy en getUserActiveAds")
    return await model.AnunciosActivos.findAll({
        where: {FK_UserID: UserID}
    });
}
*/



//delete a category that belongs to user
execute.delete = async function(Category_Code){

    console.log("estoy borrando una categoria")
        return  await  model.AdsCategory.destroy({
            where: {
              Category_Code: Category_Code,
            },
          })
}

/**
 * Obtener la información de una categoria
 * @param ID_SavedAd
 * @returns {Promise<*>}
 */
execute.getSavedAdCategory = async function (Category_Code) {
    return await model.AdsCategory.findOne({
        where: {Category_Code: Category_Code}
    });
}

module.exports = execute