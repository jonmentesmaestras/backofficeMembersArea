const {v1: uuidv1, v4: uuidv4} = require('uuid');
module.exports = class IssuesSuggestionsEntity {
    RowID = "";
    UUID = uuidv1();
    Suggestion = "";
    CreatedDate = new Date();
    FK_UserID = "";
    Active = true;
}