const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

// Special Characters in Connection String Password
// : / ? # [ ] @
// https://www.urlencoder.org/

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://trustnloveu:didtk9310%40@cluster0.uchgl.mongodb.net/node-udemy?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected to MongoDB");
      console.log("=============================================");
      _db = client.db();

      callback(client);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
