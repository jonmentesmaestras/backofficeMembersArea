const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param issuesSuggestionEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (issuesSuggestionEntity) {
    return await model.IssuesSuggestion.create({
        RowID: null,
        UUID: issuesSuggestionEntity.UUID,
        Suggestion: issuesSuggestionEntity.Suggestion,
        CreatedDate: issuesSuggestionEntity.CreatedDate,
        FK_UserID: issuesSuggestionEntity.FK_UserID,
        Active: issuesSuggestionEntity.Active,
    });
}

/**
 * Obtener los Issues and Suggestion del usuario.
 * @param userEntity
 * @returns {Promise<Model[]>}
 */
execute.getUserIssuesSuggestions = async function (userEntity) {
    return await model.IssuesSuggestion.findAll({
        where: {FK_UserID: userEntity.UserID}
    });
}

/**
 * Obtener la información de un Issue or Suggestion
 * @param idIssuesSuggestion
 * @returns {Promise<*>}
 */
execute.getIssuesSuggestionsId = async function (idIssuesSuggestion) {
    return await model.IssuesSuggestion.findOne({
        where: {UUID: idIssuesSuggestion}
    });
}
module.exports = execute