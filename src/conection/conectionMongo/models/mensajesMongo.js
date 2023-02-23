const mongoose = require("mongoose")
const { Schema }  = require("mongoose")


const nameCollection = "mensajes"

const schemaCollection = new Schema({
    author:{
        email:{type:String, require: true},
        nombre: {type:String, require: true},
        apellido: {type:String, require: true},
        edad: {type:Number, require: true},
        alias: {type:String, require: true},
        avatar: {type:String, require: true},
    },
    text:{type:String}
})

exports.mensajesModelo = schemaCollection
exports.mensajes = mongoose.model(nameCollection, schemaCollection)
