const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param UserTokenEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (UserTokensEntity) {
    return await model.UserTokens.create({
        ID_UserToken: null,
        FK_UserID: UserTokensEntity.FK_UserID,
        Token: UserTokensEntity.Token,
        Active: UserTokensEntity.Active,
        Expires: UserTokensEntity.Expires,
    });
}

/**
 * Obtener Token del usuario.
 * @param userEntity
 * @returns {Promise<Model[]>}
 */
execute.getUserTokens = async function (userEntity) {
    return await model.UserTokens.findOne({
        where: {FK_UserID: userEntity.UserID, Active: true}
    });
}

/**
 * Obtener la información de un Issue or Suggestion
 * @param idIssuesSuggestion
 * @returns {Promise<*>}
 */
/*execute.getIssuesSuggestionsId = async function (idIssuesSuggestion) {
    return await model.IssuesSuggestion.findOne({
        where: {UUID: idIssuesSuggestion}
    });
}*/

module.exports = execute