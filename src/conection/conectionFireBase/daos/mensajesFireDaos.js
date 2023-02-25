const fireBaseGestion = require("../fireBaseGestion")

class mensajesFireBase extends fireBaseGestion{
    constructor(){
        super("mensajes") 
    }
}

module.exports = mensajesFireBase