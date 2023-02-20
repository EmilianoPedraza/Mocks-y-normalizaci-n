const fs = require("fs")


class fsGestion {
    constructor(archivoName) {
      this.archivoName = archivoName;
      this.id = 0;
    }
  
    aleatori() {
      if (this.id === 0) {
        this.id = 1;
      } else {
        let newId = Math.floor(Math.random() * (9999 - (this.id + 2)));
        this.id = newId;
      }
      return this.id;
    }
  
    save = async (obj) => {
      try {
        if (fs.existsSync(this.archivoName)) {
          let listobj = await this.getAll();
          if (!obj.id) {
            listobj.length > 0
            ? (this.id = listobj[listobj.length - 1].id)
            : (this.id = 0);
            const id_ = this.aleatori()
            listobj.push({ id: id_,...obj });
          } else {
            listobj.push(obj);
          }
          await fs.promises.writeFile(this.archivoName, JSON.stringify(listobj));
          return id_
        } else {
          await fs.promises.writeFile(
            this.archivoName,
            JSON.stringify([{ id: this.aleatori(), ...obj }])
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getById = async (numId) => {
      try {
        let array = await this.getAll();
        let con = 0;
        for await (let i of array) {
          if (i.id === numId) {
            return i;
          }
          con++;
          if (con === array.length) {
            return null;
          }
        }
      } catch (error) {
        return null;
      }
    };
    getAll = async () => {
      try {
        if (fs.existsSync(this.archivoName)){
          const archivo = await fs.promises.readFile(this.archivoName, "utf-8");
          const archivoParseado = await JSON.parse(archivo);
          return archivoParseado;
        }else{
          return[]
        }
      } catch (error) {
        console.log("Error en FsGestion-getAll()",error)
        return [];
      }
    };
  
    getDeleteById = async (numId) => {
      try {
        const newArray = [];
        let array = await this.getAll();
        let con = 0;
        if (array.length > 0) {
          for await (let i of array) {
            if (i.id !== numId) {
              newArray.push(i);
            }
            con++;
            if (con === array.length) {
              if (newArray.length === array.length) {
                return null;
              }
              await fs.promises.writeFile(
                this.archivoName,
                JSON.stringify(newArray)
              );
            }
          }
        } else {
          return null;
        }
      } catch (error) {
        console.log("Error en DeleteByID");
      }
    };
  
    deleteAll = async () => {
      try {
        await fs.promises.writeFile(this.archivoName, "[]");
        this.id = 0;
      } catch (error) {
        console.log(
          "Hubo un error a la hora de eliminar los elementos del array"
        );
      }
    };
    update = async (id, obj) => {
      try {
        if (fs.existsSync(this.archivoName)) {
          let listobj = await this.getAll();
          if (!obj.id) {
            listobj.length > 0
              ? (this.id = listobj[listobj.length - 1].id)
              : (this.id = 0);
            obj = {id,...obj}
          }
          if (listobj.length > 0) {
            let con = -1;
            listobj.forEach((item, ind) => {
              item.id === id && (con = ind)
            });
            if (con === -1) {
              return null;
            } else {
              listobj[con] = obj;
              await fs.promises.writeFile(
                this.archivoName,
                JSON.stringify(listobj)
              );
            }
          }
          else{
            return null;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  

  module.exports = fsGestion