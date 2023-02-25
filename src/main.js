//DEPENDENCIAS
const express = require("express");
// const moment = require("moment");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

//DEPENDENCIA PARA TRABAJAR CON MOOKS================================
const faker = require("faker");
faker.locale = "es";
const { commerce, image } = faker;

//DEPENDENCIAS PARA NORMALIZAR=======================================
const normalizeFormat = require("./normalizee/normalizeFormat");


//FILE SISTEM========================================================
//import fileSystem
const mensajesFs = require("./conection/conectionFs/daos/mensajesFs");
const productosFs = require("./conection/conectionFs/daos/productosFs");

//instancia de clases
const mensajesFile = new mensajesFs();
const productosFile = new productosFs();

//MONGO==============================================================
//import para realizar la conección 
const configConectionMongo = require("./conection/conectionMongo/config/configMongo")
configConectionMongo()

//import daos de mongo
const mensajesMongo = require("./conection/conectionMongo/daos/mensajesMongoDaos");
const productosMongo = require("./conection/conectionMongo/daos/productosMongoDaos");

//istancia de clases
const mensajesMongo_ = new mensajesMongo
const productosMongo_ = new productosMongo
//FIRE BASE===========================================================
//imports daos FireBase
const mensajesFireBase = require("./conection/conectionFireBase/daos/mensajesFireDaos")
const productosFireBase = require("./conection/conectionFireBase/daos/productosFireDaos")
//instancias de clases
const mensajesFireBase_ = new mensajesFireBase
const productosFireBase_ = new productosFireBase
//necesarios para el servidor=========================================
const app = express();
const puerto = 8080;
const publicRoute = "./public";
//====================================================================
//configuración de sockets
const htmlserver = new HttpServer(app);
const io = new IOServer(htmlserver);
//====================================================================

//se levanta el servidor
const server = htmlserver.listen(puerto, () => {
  console.log(
    `Servidor levantado con exito en puerto: ${server.address().port}`
  );
});

//=====================================================================
//conección de sockets
io.on("connection", async (socket) => {
  // await productosSql.deleteAll()
  // await mensajesSql.deleteAll()
  console.log("\nCliente conectado");
  const listProd = await productosFile.getAll();
  socket.emit("canalProductos", listProd);

  socket.on("nuevoProducto", async (prod) => {
    const prdInMongo = await productosMongo_.savee(prod)
    await productosFile.save({id: prdInMongo,...prod});
    io.sockets.emit("actualizacionPrd", prod);
  });
  //APARTADO DE MENSAJES
  const listMessage = await mensajesFile.getAll();
  if (listMessage.length > 0) {
    const recivoMensajeNormalizo_1 = await normalizeFormat(listMessage);
    socket.emit("mensajes", recivoMensajeNormalizo_1);
  }

  socket.on("nuevoMensaje", async (msjRecib) => {
    const msjInMongo = await mensajesMongo_.savee(msjRecib)
    await mensajesFireBase_.saveeFb(msjRecib, msjInMongo)
    await mensajesFile.save({id: msjInMongo,...msjRecib});
    io.sockets.emit("nuevoMensajeAtodos", msjRecib);
  });
});

//==============================================================================================
//ruta de carpeta public con index.html
app.use(express.static(publicRoute));
//==============================================================================================
//ruta nueva para mooks
app.get("/api/productos-test", (req, res) => {
  const randomProducts = [];
  for (let i = 0; i < 5; i++) {
    randomProducts.push({
      id: i + 1,
      title: commerce.product(),
      price: commerce.price(),
      thumbnail: image.imageUrl(),
    });
  }
  res.json(randomProducts);
});
//endpoint que retorna la vista principal(index.html)
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: { publicRoute } });
});
server.on("error", (error) => {
  console.log(`Ah ocurrido un ${error}`);
});
