const mongoose = require("mongoose");
const { MONGO_CONN_URL } = require("../config/envVariable");

const connectMongo = () => {
  mongoose
    .connect(MONGO_CONN_URL)
    .then(() => {
      console.log("connection to db success");
    })
    .catch((err) => {
      console.log(`error in connecting to db : ${err.message}`);
    });
};

module.exports = connectMongo;
