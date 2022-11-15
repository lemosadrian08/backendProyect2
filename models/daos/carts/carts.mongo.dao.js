const { Schema } = require('mongoose');
const { HTTP_STATUS } = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/api.utils');
const MongoContainer = require('../../containers/mongo.container');
const ProductsMongoDao = require('../products/products.mongo.dao')


const productsMongoDAO = new ProductsMongoDao()

const collection = "carts";
const usersSchema = new Schema({
  timestamp: { type: String, default: new Date().toLocaleString() },
  products: { type: Array, required: true, default: [] },
});

class CartsMongoDao extends MongoContainer {
  constructor() {
    super(collection, usersSchema);
  }


  async createACartF(){
    
  }

  async getProductsOfACartF(id) {
    const cart = await this.getById(id)
    return [...cart.products]
  }

  async addProductToCartF(idc, idp) {
    const product = await productsMongoDAO.getById(idp)
    const updatedCart = await this.model.updateOne({ _id: idc }, { $push: { products: product } })
    if (!updatedCart) {
      const message = `Cart with id ${idc} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return updatedCart
  }

  async deleteProductInACartByIdF(idc, idp) {
    const product = await productsMongoDAO.getById(idp)
    const updatedCart = await this.model.updateOne({ _id: idc }, { $pull: { products: product } })
    if (!updatedCart) {
      const message = `Cart with id ${idc} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return updatedCart
  }
 



}

module.exports= CartsMongoDao