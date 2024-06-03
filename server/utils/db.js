const mongoose = require('mongoose');

console.log(process.env.MONGODB_URL)

uri=process.env.MONGODB_URL;

const conectdb=mongoose.connect(uri)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

  module.exports = conectdb; 