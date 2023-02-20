

class MongoGestion {
    constructor(schema) {
      this.schema = schema;
    }
  
    getById = async (numId) => {
      try {
          const res = await this.schema.find({_id: numId})
          return res
      } catch (error) {
          console.log("Error en MongoGestion-getById():\n",error)     
          return[]
      }
    };
    getAll = async () => {
      try {
          const res = await this.schema.find()
          return res
      } catch (error) {
          console.log("Error en MongoGestion-getAll():\n",error)
          return[]
      }
    };
  
    getDeleteById = async (numId) => {
      try {
          await this.schema.deleteOne({_id:numId})
      } catch (error) {
          console.log("Error en MongoGestion-getDeleteById():\n",error)
      }
    };
  
    deleteAll = async () => {
      try {
          await this.schema.deleteMany()
      } catch (error) {
          console.log("Error en Mongogestion-deleteAll():\n",error)
      }
    };
    update = async (id, obj) => {
      try {
          await this.schema.updateOne({_id:id},{$set:obj})
      } catch (error) {
          console.log("Error en MongoGestion-update():\n",error)
      }
    };
  }
  
  
  
module.exports = MongoGestion