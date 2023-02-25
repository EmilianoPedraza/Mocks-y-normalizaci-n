const fireBaseGestion = require("../fireBaseGestion")

class productosFireBase extends fireBaseGestion{
    constructor(){
        super("productos") 
    }
}

module.exports = productosFireBase