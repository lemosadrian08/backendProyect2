const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "products";
const usersSchema = new Schema({
    name: { type: String },
    description: { type: String },
    code: { type: String },
    price: { type: String },
    img: { type: String },
    timestamp: { type: String, default: new Date().toLocaleString() },
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, usersSchema);
  }
}

module.exports= ProductsMongoDao