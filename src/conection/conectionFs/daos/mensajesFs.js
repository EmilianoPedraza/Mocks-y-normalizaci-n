const fsGestion = require("../conectionFs")

class mensajesFs extends fsGestion{
    constructor(){
        super("./src/contenedores/mensajesFs.txt")
    }
}


module.exports = mensajesFs