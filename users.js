const model = require('./model')
const persistence = require('./persistence')
const {where} = require("sequelize");
var users = {}

async function checkUser(email, pass) {
    try {

        

        const user = await model.Usuario.findOne({
            where: {Email: email, Password: pass,  Active: 1},
        });
        var msg = ""
        if (user === null) {
            msg = 'Not Found'
        } else {
            msg = user.UserID
        }

        return msg

    } catch (error) {
        console.log("an error occurred " + error)
    }
}

// users.startSession = async function (email, pass) {
users.startSession = async function (userEntityObject) {
    try {
        let userObj = await model.Usuario.findOne({
            where: {Email: userEntityObject.Email, Password: userEntityObject.Password, Active: 1},
        });
        if (userObj === null) {
            return false
        }
        userEntityObject.FK_IDPersona = userObj.FK_IDPersona;
        userEntityObject.UserID = userObj.UserID;
        return userEntityObject
    } catch (error) {
        console.log("an error occurred " + error)
    }
}

users.checkEmail = async function (userEmail) {
    const exists = await model.Usuario.findOne({
        where: {Email: userEmail, Active: 1}
    });
    if (exists == null) {
        return false;
    }
    return exists;
}


users.findUser = async function (Email, Pass) {

    const myUser = await checkUser(Email, Pass)

    console.log("myUser is " + myUser);

    return myUser;
}

users.createUser = async function (fieldValues) {
    const newUser = await persistence.createUser(fieldValues)
    return newUser
}

users.cancelSubscription = async function(email){

    return await model.Usuario.update({Active: 0}, {
        where: {Email: email, Active: 1}
    })


}

users.getUserById = async function (userId) {
    const userInfo = await model.Usuario.findOne({
        where: {UserID: userId, Active: 1}
    });
    if (userInfo == null) {
        return false;
    }
    return userInfo;
}

users.getUserByEmail = async function (Email) {
    const userInfo = await model.Usuario.findOne({
        where: {Email: Email, Active: 1}
    });
    if (userInfo == null) {
        return false;
    }
    return userInfo;
}


module.exports = users



