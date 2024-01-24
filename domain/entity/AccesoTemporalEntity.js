const {v1: uuidv1, v4: uuidv4} = require('uuid');

module.exports = class AccesoTemporalEntity {

    #now = new Date();
    #diezMinutos = 600000; // milisegundos
    #diezMinutosMas = this.#now.getTime() + this.#diezMinutos;

    LinkID = uuidv1() + uuidv1();
    CreateAT = this.#now;
    ValidUntil = new Date(this.#diezMinutosMas);
    FK_UserID = null;
}