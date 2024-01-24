const EstanteriaModel = require('./EstanteriaModel')
const EstanteriaEntity = require('../entity/EstanteriaEntity')
const Utils = require('../services/Utils')

let currDate = Utils.getCurrentDateTime()

let newEstanteriaObj = new EstanteriaEntity;

newEstanteriaObj.EstanteriaCode = "UDEMY"
newEstanteriaObj.EstanteriaDesc = "La estanteria de UDEMY"
newEstanteriaObj.Active = true;
newEstanteriaObj.ActivedDT = currDate;
newEstanteriaObj.CreatedBy = "Jon";
newEstanteriaObj.CreatedDT = currDate;
newEstanteriaObj.UpdatedBy = "Jon";
newEstanteriaObj.UpdatedDT = currDate;

//console.log('newEstanteriaObj', newEstanteriaObj)

async function addEstanteria (Estanteria) {
    EstanteriaModel.store(Estanteria)
}

addEstanteria(newEstanteriaObj)
.then(result => console.log(result))
.catch(error => console.log(error))