const model = require('./../../model');

var execute = {};

/**
 * Crear un nuevo registro de Issues and Suggestion
 * @param KeywordsCategoryEntity
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
execute.store = async function (KeywordsCategoryEntity) {
    return await model.KeywordsCategory.create({

        KeywordCatID:null,
        KeywordCatCode: KeywordsCategoryEntity.KeywordCatCode,
        KeywordCatDescr: KeywordsCategoryEntity.KeywordCatDescr

    });
}





module.exports = execute