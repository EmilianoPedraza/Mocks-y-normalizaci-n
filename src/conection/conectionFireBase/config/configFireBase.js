const serviceAcount = require("./mook-data-firebase-adminsdk-ag2lh-c7d607adb2.json")
const admin = require("firebase-admin")

admin.initializeApp({credential: admin.credential.cert(serviceAcount)})
module.exports = (colecion) =>{
    const db = admin.firestore()
    const conectarA = db.collection(colecion)
    return conectarA
}
