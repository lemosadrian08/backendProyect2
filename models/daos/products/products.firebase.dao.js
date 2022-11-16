const FirebaseContainer = require("../../containers/firebase.container");
const { HTTP_STATUS } =require ('../../../constants/api.constants')
const { HttpError } =require ('../../../utils/api.utils')

const collection = "products";
class ProductsFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }


  async save(item) {
    const { name, description, code, img, price } = item

    if (!name || !description || !code || !img || !price) {
      const message = 'Wrong body format: missing fields'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    const docRef = this.query.doc()
    return await docRef.set({
      timestamp: new Date().toLocaleString(),
      ...item
    })
  }

  async update(id, item) {
    const { name, description, code, img, price } = item

    if (!name || !description || !code || !img || !price) {
      const message = 'Wrong body format: missing fields'
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    
    const docRef = this.query.doc(id)
    if (!docRef) {
      const message = `Resource with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update(item)
  }

}


module.exports = ProductsFirebaseDao;