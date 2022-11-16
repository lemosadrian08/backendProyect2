const envConfig = require("../../config");

let UsersDao;
let ProductsDao;
let CartsDao

switch(envConfig.DATASOURCE) {
  case 'mongo':
    UsersDao = require('./users/users.mongo.dao');
    ProductsDao = require('./products/products.mongo.dao')
    CartsDao = require('./carts/carts.mongo.dao')
    break;
  case 'firebase':
    ProductsDao = require('./products/products.firebase.dao');
    UsersDao = require('./users/users.firebase.dao');
    CartsDao = require('./carts/carts.firebase.dao')
    break
  case 'memory':
    ProductsDao = require('./products/products.memory.dao')
    UsersDao = require('./users/users.memory.dao');
    CartsDao = require('./carts/carts.memory.dao')
    break
  default:
    throw new Error("Invalid Datasou,rce");
}

module.exports = {
  UsersDao,
  ProductsDao,
  CartsDao
}