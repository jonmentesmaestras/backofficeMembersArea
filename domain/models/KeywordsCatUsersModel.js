const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param KeywordsCatUsersEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (KeywordsCatUsersEntity) {
    return await model.KeywordsCatUsers.create({

        KeywordsCatUsersID:null,
        KeywordCatCode: KeywordsCatUsersEntity.KeywordCatCode,
        FK_UserID: KeywordsCatUsersEntity.FK_UserID

    });
}





module.exports = execute