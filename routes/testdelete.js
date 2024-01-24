const errorStruct = require('../domain/entity/ErrorStructure');
const AnunciosGuardados = require('../domain/entity/AnunciosGuardadosEntity');
const AnunciosGuardadosModel = require('../domain/models/AnunciosGuardadosModel')

const model = require('../model')
//delete advertisements

async function desactivarAd(){
    try {

        // desactivar anuncio
       return await model.AnunciosGuardados.update({Active: 0}, {
            where: {ID_SavedAd: 3}
        })
        
        



        
    } catch (e) {
        console.log("Error borrando ")
        console.log(e)
       
    }
    
}

desactivarAd()


