const mongoose = require("mongoose")
const { Schema }  = require("mongoose")


const nameCollection = "productos"

const schemaCollection = new Schema({
    title: {type:String, require:true},
    price: {type:String, require:true},
    price: {type:Number, require:true},
})


export const esquema = schemaCollection
module.exports = mongoose.model(nameCollection, schemaCollection)
