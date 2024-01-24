const model = require('./model')
const {Sequelize} = require("sequelize");
const errorStruct = require("./domain/entity/ErrorStructure");
var execute = {}

async function insertData(tableName, fields) {

    try {

        switch (tableName) {

            case 'Factura':
                // Create a new Factura object.
                const factura = await model.Factura.create({
                    Codigo: fields.Codigo,
                    Concepto: fields.Concepto,
                    ValorTotal: fields.ValorTotal
                });
                break;

            case 'Persona':
                // Create a new Factura object.
                const persona = await model.Persona.create({
                    Nombre: fields.Nombre,
                    Apellido: fields.Apellido,
                    Edad: fields.Edad,
                    FK_IDPais: fields.FK_IDPais,
                    FK_IDFactura: fields.FK_IDFactura

                });
                return persona.id
                break;

            case 'Usuario':
                // Create a new Usuario object.
                const usuario = await model.Usuario.create({
                    Email: fields.Email,
                    Password: fields.Password,
                    Active: fields.Active,
                    FK_IDPersona: fields.FK_IDPersona

                });
                return usuario.id
                break;

            case 'AccesoTemporal':
                return await model.AccesoTemporal.create({
                    RowID: null,
                    LinkID: fields.LinkID,
                    CreatedDate: fields.CreateAT,
                    ValidUntil: fields.ValidUntil,
                    FK_UserID: fields.FK_UserID
                });
            /*).then(result => {
                return result;
            }).catch((reason) => {
                console.log(reason)
                return false;
            });*/
        }


    } catch (error) {
        console.log("an error occurred " + error)
    }
}


execute.createUser = async function (fieldValues) {
//INSERT FACTURA    
    var fieldsFactura = {Codigo: fieldValues.CodigoFactura, Concepto: "COMPRA SOFTWARE", ValorTotal: 15.00}

    const myfactura = await insertData('Factura', fieldsFactura)

    const myFactura = await model.Factura.findAll({
        where: {Codigo: fieldValues.CodigoFactura},
    });

    const idFactura = myFactura[0].IDFactura;

    console.log("idFactura is " + idFactura);

// INSERT PERSON
    var fieldsPersona = {
        Nombre: fieldValues.Nombre,
        Apellido: fieldValues.Apellido,
        Edad: 15,
        FK_IDPais: 5,
        FK_IDFactura: idFactura
    }

    const myPerson = await insertData('Persona', fieldsPersona)

    const persona = await model.Persona.findAll({
        where: {FK_IDFactura: idFactura},
    });

    const idPersona = persona[0].IDPersona;

    console.log("idPersona is " + idPersona);

// INSERT USER
    var fieldsUsuario = {
        Email: fieldValues.Email,
        Password: fieldValues.Password,
        Active: true,
        FK_IDPersona: idPersona
    }

    const myUser = await insertData('Usuario', fieldsUsuario)

    const user = await model.Usuario.findOne({
        where: {FK_IDPersona: idPersona},
    })


    console.log("user is " + user.UserID);
    return user

}

/*var fieldValues = {CodigoFactura:"363777", Nombre:"Lioneal", Apellido:"Messia", Email:"messia@aaest.com", Password:"78787"}*/

//main(fieldValues)

execute.createTemporalAccess = async function (fieldValues) {
    return await insertData('AccesoTemporal', fieldValues)
}

module.exports = execute



