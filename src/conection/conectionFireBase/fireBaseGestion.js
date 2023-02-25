const  conectarAcollection = require("./config/configFireBase");

class FireBaseGestion {
  constructor(NameColeccion) {
    this.coleccion = conectarAcollection(NameColeccion);
  }
  saveeFb = async (obj, id) => {
    try {
      const newDoc = this.coleccion.doc(id)
      await newDoc.create(obj)
    } catch (error) {
      console.log("Error en FireBaseGestion-saveFb():\n", error);
    }
  };

  getAllFb = async () => {
    try {
      const productos = await this.coleccion.get();
      const listaDeProductos =
        productos.docs.length > 0
          ? productos.docs.map((prod) => {
              return { id: prod.id, ...prod.data() };
            })
          : "----No hay productos.";
      console.log("LISTA DE PRODUCTOS DE FIRE-BASE:");
      console.log(listaDeProductos);
      return listaDeProductos;
    } catch (error) {
      console.log("Error en FireBaseGestion-getAllFb():\n", error);
    }
  };

  getByIdFb = async (id) => {
    try {
      const producto = await this.coleccion.doc(id).get();
      console.log("\nProducto:", id, " -En fireBase.");
      if(producto!==undefined){
        console.table(producto.data())
        return producto.data()
      }
      else{
        console.log("------no encontrado");
      }
    } catch (error) {
      console.log("Ërror en FireBaseGestion-getByIdFb():\n", error);
    }
  };

  deleteByIdFb = async (id) => {
    try {
        this.coleccion.doc(id).delete()
        .catch(error=>{
          console.log("Error no se pudo eliminar id:[",id,"]")
        })
        .then(doc=>{
          console.log("EL DOCUMENTO  id:[",id,"] en deleteByIdFb():\n")
          console.table(doc)

        })
    } catch (error) {
        console.log("Error en FireBaseGestion-deleteByIdFb():\n", error);
    }
  };
  updateFb = async (id, obj)=>{
    try {
      await this.coleccion.doc(id).update(obj)
      .then(res=>{
        console.log("La actualización de id:[",id,"]:\n")
        console.table(res)
      })
      
    } catch (error) {
      console.log("Error en FireBaseGestion- updateFb():\n", error);
    }

  }
}

module.exports = FireBaseGestion