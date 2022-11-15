const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "users";
const usersSchema = new Schema({
  nombre: { type: String },
  email: { type: String, unique: true }, 
  website: { type: String },
  image: { type: String }
});

class UsersMongoDao extends MongoContainer {
  constructor() {
    super(collection, usersSchema);
  }
}

module.exports= UsersMongoDao