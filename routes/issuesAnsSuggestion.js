var express = require('express');
var router = express.Router();
var AuthSvc = require('./../domain/services/AuthSvc')
const errorStruct = require('../domain/entity/ErrorStructure');
const issuesSuggestion = require('./../domain/entity/IssuesSuggestionEntity');
const suggestionModel = require('./../domain/models/IssuesSuggestionsModel')

router.post('/', async (req, res, next) => {
    let response = {};
    response.error = false;
    response.status = 200;
    try {
        // Iniciar session o comprobar el usuario.
        const userEntity = await AuthSvc.init(req, res, next);
        if (userEntity.error) {
            throw userEntity
        }

        const suggestionMsg = req.body.suggestion ?? false;
        if (!suggestionMsg) {
            const error = new errorStruct;
            error.code = 400;
            error.message = `The key 'suggestion' is missing or empty.`
            throw error;
        }
        // Crear el objeto que contiene la sugerencia o issue.
        let newIssuesSuggestionObj = new issuesSuggestion;
        newIssuesSuggestionObj.FK_UserID = userEntity.user.UserID;
        newIssuesSuggestionObj.Suggestion = suggestionMsg;

        let resultSave = await suggestionModel.store(newIssuesSuggestionObj)
        delete resultSave.dataValues.RowID;
        delete resultSave.dataValues.FK_UserID;
        response.message = "Se ha creado el registro con exito.";
        response.data = resultSave;
    } catch (e) {
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(e.code)
    }
    return res.json(response)
})

router.get('/', async (req, res, next) => {
    let response = {};
    try {
        // Iniciar session o comprobar el usuario.
        const userEntity = await AuthSvc.init(req, res, next);
        if (userEntity.error) {
            throw userEntity
        }
        
        
        // Obtener los issues and suggestion del usuario.
        response.data = await suggestionModel.getUserIssuesSuggestions(userEntity.user)
    } catch (e) {
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(e.code)
    }
    return res.json(response)
})

router.get('/id/:uuid', async (req, res, next) => {
    let response = {};
    response.error = false;
    response.status = 200;
    response.message = "success";
    try {

        // Iniciar session o comprobar el usuario.
        const userEntity = await AuthSvc.init(req, res, next);
        if (userEntity.error) {
            throw userEntity
        }
        // Obtener los issues and suggestion del usuario.
        const idIssuesSuggestion = req.params.uuid;
        let result = await suggestionModel.getIssuesSuggestionsId(idIssuesSuggestion)
        console.log(result);
        if (!result) {
            const error = new errorStruct;
            error.code = 404;
            error.message = `No se ha encontrado registro para '${idIssuesSuggestion}'.`
            throw error;
        }
        response.data = result;
    } catch (e) {
        response.error = e.error;
        response.message = e.message;
        response.status = e.status;
        response.code = e.code;
        res.status(e.code)
    }
    return res.json(response)
})

module.exports = router;