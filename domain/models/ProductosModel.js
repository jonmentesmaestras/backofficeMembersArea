const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param ProductosEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (ProductosEntity) {
    return await model.Productos.create({

        ProductID: null,
        ProductCode: ProductosEntity.ProductCode ,
        ProductName: ProductosEntity.ProductName ,
        Estado: ProductosEntity.Estado,
        ImageURL: ProductosEntity.ImageURL,
        ProductDesc: ProductosEntity.ProductDesc ,
        WebhookKey: ProductosEntity.WebhookKey ,
        Webhook: ProductosEntity.Webhook ,
        ThirdPartyProductID: ProductosEntity.ThirdPartyProductID ,
        Disponibilidad: ProductosEntity.Disponibilidad ,
        FK_ProductCategoryCode: ProductosEntity.FK_ProductCategoryCode ,        
        Active: ProductosEntity.Active,
        ActivedDT: ProductosEntity.ActivedDT,
        CreatedBy: ProductosEntity.CreatedBy ,
        CreatedDT: ProductosEntity.CreatedDT,
        UpdatedBy: ProductosEntity.UpdatedBy,
        UpdatedDT: ProductosEntity.UpdatedDT 

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