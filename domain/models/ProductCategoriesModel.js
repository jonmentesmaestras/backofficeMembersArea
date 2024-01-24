const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param ProductCategoriesEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (ProductCategoriesEntity) {
    return await model.ProductCategories.create({

        ProductCategoryID: null,
        ProductCategoryCode: ProductCategoriesEntity.ProductCategoryCode,
        ProductCategoryDesc: ProductCategoriesEntity.ProductCategoryDesc,
        FK_EstanteriaCode: ProductCategoriesEntity.FK_EstanteriaCode,
        Active: ProductCategoriesEntity.Active,
        ActivedDT: ProductCategoriesEntity.ActivedDT,
        CreatedBy: ProductCategoriesEntity.CreatedBy ,
        CreatedDT: ProductCategoriesEntity.CreatedDT,
        UpdatedBy: ProductCategoriesEntity.UpdatedBy,
        UpdatedDT: ProductCategoriesEntity.UpdatedDT 

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