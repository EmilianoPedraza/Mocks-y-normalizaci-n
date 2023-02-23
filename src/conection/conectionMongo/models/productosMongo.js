const mongoose = require("mongoose")
const { Schema }  = require("mongoose")


const nameCollection = "productos"

const schemaCollection = new Schema({
    title: {type:String, require:true},
    price: {type:String, require:true},
    thumbnail: {type:String, require:true},
})


exports.productosModelo = schemaCollection
exports.productos = mongoose.model(nameCollection, schemaCollection)
