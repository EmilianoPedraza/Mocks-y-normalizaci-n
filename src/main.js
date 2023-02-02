//DEPENDENCIAS
const express = require("express");
const moment = require("moment");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");


//DEPENDENCIA PARA TRABAJAR CON MOOKS
const faker = require("faker")
faker.locale = "es"
const {commerce, lorem, image} = faker



// para gestion mySQL y sqlite3
const gestionSql = require("./scriptsSql/gestionSql.js");
const { mysql, sqlite3 } = require("./conection/options.js");
//construccion mySQL y sqlite3==============================
const productosSql = new gestionSql(mysql, "productos");
const mensajesSql = new gestionSql(sqlite3, "mensajes");






//necesarios para el servidor=========================================
const app = express();
const puerto = 8080;
const publicRoute = "./public";
//==============================================================================================
//configuración de sockets
const htmlserver = new HttpServer(app);
const io = new IOServer(htmlserver);
//==============================================================================================

//se levanta el servidor
const server = htmlserver.listen(puerto, () => {
  console.log(
    `Servidor levantado con exito en puerto: ${server.address().port}`
  );
});


//==============================================================================================
//conección de sockets
io.on("connection", async (socket) => {
  // await productosSql.deleteAll()
  // await mensajesSql.deleteAll()
  console.log("\nCliente conectado");
  const listProd = await productosSql.getAll();
  socket.emit("canalProductos", listProd);

  socket.on("nuevoProducto", async (prod) => {
    await productosSql.save(prod);
    io.sockets.emit("actualizacionPrd", prod);
  });
  const listMessage = await mensajesSql.getAll();
  socket.emit("mensajes", listMessage);

  socket.on("nuevoMensaje", async (msjRecib) => {
    await mensajesSql.save(msjRecib);
    io.sockets.emit("nuevoMensajeAtodos", msjRecib);
  });
});

//==============================================================================================
//ruta de carpeta public con index.html
app.use(express.static(publicRoute));
//==============================================================================================
//ruta nueva para mooks
app.get("/api/productos-test",(req, res)=>{
  const randomProducts = []
  for (let i = 0; i < 5; i++) {
    randomProducts.push({
      id: i + 1,
      title: commerce.product(),
      price: commerce.price(),
      thumbnail: image.imageUrl()
    })
  }
  res.json(randomProducts)
})
//endpoint que retorna la vista principal(index.html)
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: { publicRoute } });
});
server.on("error", (error) => {
  console.log(`Ah ocurrido un ${error}`);
});
