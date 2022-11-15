const { FieldValue } = require('firebase-admin/firestore');
const { HTTP_STATUS } = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/api.utils');
const FirebaseContainer = require("../../containers/firebase.container");
const ProductsFirebaseDao = require('../products/products.firebase.dao')

const productsFirebaseDao = new ProductsFirebaseDao()


const collection = "carts";
class CartsFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }

  async save(){
    const docRef = this.query.doc();
    return await docRef.set({products: [], timestamp: Date.now().toLocaleString()});
  }

  async getProductsOfACartF(id) {
    const cart = await this.getById(id)
    return [...cart.products]
  }

  async addProductToCartF(idc, idp) {
    const product = await productsFirebaseDao.getById(idp)
    const docRef = this.query.doc(idc);
    if (!docRef) {
      const message = `Resource with id ${idc} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.update({products: FieldValue.arrayUnion(product)});
  }


  async deleteProductInACartByIdF(idc, idp) {
    const product = await productsFirebaseDao.getById(idp)
    const docRef = this.query.doc(idc)
    console.log(docRef);
    if (!docRef) {
      const message = `Resource with id ${idc} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update({ products: FieldValue.arrayRemove(product) })
  }

}

module.exports = CartsFirebaseDao;