const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param LessonsEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (LessonsEntity) {
    return await model.Lessons.create({

        LessonID: null,
        LessonCode: LessonsEntity.LessonCode  ,
        LessonName: LessonsEntity.LessonName ,
        LessonDuration: LessonsEntity.LessonDuration ,
        LessonVideoScript: LessonsEntity.LessonVideoScript ,
        FK_ProductModuleCode: LessonsEntity.FK_ProductModuleCode ,        
        Active: LessonsEntity.Active,
        ActivedDT: LessonsEntity.ActivedDT,
        CreatedBy: LessonsEntity.CreatedBy ,
        CreatedDT: LessonsEntity.CreatedDT,
        UpdatedBy: LessonsEntity.UpdatedBy,
        UpdatedDT: LessonsEntity.UpdatedDT 

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