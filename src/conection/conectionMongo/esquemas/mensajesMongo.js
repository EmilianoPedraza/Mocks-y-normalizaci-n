const mongoose = require("mongoose")
const { Schema }  = require("mongoose")


const nameCollection = "productos"

const schemaCollection = new Schema({
    id:{type: String, require: true},
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

export const esquema = schemaCollection
module.exports = mongoose.model(nameCollection, schemaCollection)
