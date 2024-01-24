const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param UsuariosCategoriaEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (UsuariosCategoriaEntity) {
    return await model.UsuariosCategoria.create({

        ID_UsuarioCategoria:null,
        FK_UserID: UsuariosCategoriaEntity.FK_UserID,
        FK_Category_Code: UsuariosCategoriaEntity.FK_Category_Code
        

    });
}

// get the categories by user
execute.getUserCategories = async function (UserID) {
    console.log("estoy en getUserAds")
    return await model.UsuariosCategoria.findAll({
        where: {FK_UserID: UserID}
    });
}

execute.getUsuariosCategorias = async function(UserID){

    return await model.UsuariosCategoria_View.findAll({
        where:{FK_UserID: UserID}
    })
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
execute.delete = async function(FK_UserID, FK_Category_Code){



    console.log("estoy borrando una categoria para un usuario")

        return  await  model.UsuariosCategoria.destroy({
            where: {
              FK_UserID: FK_UserID,
              FK_Category_Code: FK_Category_Code
            },
          })
}

/**
 * Obtener la información de un Issue or Suggestion
 * @param ID_SavedAd
 * @returns {Promise<*>}
 */
execute.getCategoryCode = async function (Category_Name) {
    return await model.AdsCategory.findOne({
        where: {Category_Name: Category_Name}
    });
}
module.exports = execute