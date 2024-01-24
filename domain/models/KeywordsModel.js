const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param KeywordsEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (KeywordsEntity) {
    return await model.Keywords.create({

        KeywordID:null,
        Keyword: KeywordsEntity.Keyword,
        FK_KeywordCatCode: KeywordsEntity.FK_KeywordCatCode,
        FK_UserID: KeywordsEntity.FK_UserID
        

    });
}

// get the categories by user
execute.getUserKeywords = async function (UserID) {
    console.log("estoy en getUserAds")
    return await model.Keywords.findAll({
        where: {FK_UserID: UserID}
    });
}

execute.getUserKeywords = async function (UserID, KeywordCatCode) {
    console.log("estoy en getUserAds")
    return await model.Keywords.findAll({
        where: {FK_UserID: UserID, FK_KeywordCatCode: KeywordCatCode}
    });
}

//retorna todos las keywords con todas las categorias del usuario
execute.getAllUserKeywordsCat = async function(UserID){

    return await model.UsuariosKeywordsCat_Views.findAll({
        where:{FK_UserID: UserID}
    })
}

// retorna todas las categorias de las keywords del usuario
execute.getUsuariosKeywordsCat = async function(UserID){

    return await model.UsuariosKeywordCat_Views.findAll({
        where:{FK_UserID: UserID}
    })
}


//delete a category that belongs to user
execute.delete = async function(KeywordID ){

    console.log("estoy borrando una keyword para un usuario")

        return  await  model.Keywords.destroy({
            where: {
                KeywordID: KeywordID
              
            },
          })
}


module.exports = execute