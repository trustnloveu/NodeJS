const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://trustnloveu:didtk9310@@cluster0.uchgl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected to MongoDB");
      callback(client);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = mongoConnect();
