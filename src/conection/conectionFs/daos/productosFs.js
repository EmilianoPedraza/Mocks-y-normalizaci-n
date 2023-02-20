const fsGestion = require("../conectionFs")

class productosFs extends fsGestion{
    constructor(){
        super("./src/contenedores/productosFs.txt")
    }
}

module.exports = productosFs