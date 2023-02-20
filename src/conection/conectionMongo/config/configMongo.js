const mongoose = require("mongoose")
module.exports = (cb) => {
  //un callback por las dudas
  mongoose.set({ strictQuery: false });
  const URL = "mongodb+srv://mook:123Uep@mook-data.3u5wutu.mongodb.net/mook-data";
  mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
  });
  cb && cb()
};
