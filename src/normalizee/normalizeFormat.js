const { schema, normalize, denormalize } = require("normalizr");

//esquemas
const author_ = new schema.Entity("author", {}, { idAttribute: "email" });


const emisor_ = new schema.Entity("mensaje",{
    author: author_
  },{ idAttribute: "id" }
);

const _mensajes = new schema.Entity("mensajes", {
  mensajes : [emisor_]
},{ idAttribute: "id" });



//Funcion normalizar y desnormalizar
const obtnrMsjsNormalizados = async (array) => {
  return (normalize({"id":"mensajes","mensajes": array}, _mensajes));
};

module.exports = obtnrMsjsNormalizados;
