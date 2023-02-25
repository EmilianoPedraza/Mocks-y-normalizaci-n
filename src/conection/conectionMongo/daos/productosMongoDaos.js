const MongoGestion = require("../conectionMongo");
const { productosModelo, productos } = require("../models/productosMongo");
class productosMongoDaos extends MongoGestion {
  constructor() {
    super(productos);
    this.esque = productosModelo;
  }
  formatId = async (docs) => {
    const schemaCamps = { ...this.esque.obj, _id: true, id: true };
    const dcNw = {};
    if (docs !== []) {
      const doc = docs[0];
      for (const key in schemaCamps) {
        doc[`${key}`] !== undefined && (dcNw[`${key}`] = doc[`${key}`]);
      }
    }
    return dcNw;
  };

  savee = async (obj) => {
    try {
      if (!obj.id) {
        const nuevo = await new this.schema(obj);
        await nuevo.save();
        const prod = await this.schema.find({_id:nuevo._id}).limit(1)
        const idRes = await this.formatId(prod)
        return idRes.id
      } else {
        const newe = new this.schema(obj, {
          id: { default: obj.id },
          _id: false,
        });
        await newe.save();
      }
    } catch (error) {
      console.log("Error MongoGesetion-save():\n", error);
    }
  };
}

module.exports = productosMongoDaos;
