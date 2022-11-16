const MemoryContainer = require("../../containers/memory.container");
const { HTTP_STATUS } = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/api.utils');
const fs = require('fs');
const { v4: uuid } = require("uuid");
const ProductsMemoryDao = require('../products/products.memory.dao')



const productsMemoryDao = new ProductsMemoryDao("/DB/data/products.json")


const fileRoute = "./DB/data/carts.json"
const collection = "carts";
class CartsMemoryDao extends MemoryContainer {
  constructor() {
    super("/DB/data/carts.json");
  }

  async save(){
    const content = await fs.promises.readFile(fileRoute,'utf-8');
    const jsonContent = JSON.parse(content);
    const newItem = {
      id: uuid(),
      timestamp: Date.now(),
      products: []
    };
    jsonContent.push(newItem)
    await fs.promises.writeFile(fileRoute, JSON.stringify(jsonContent, null, 2))
    return  newItem

  }

async addProductToCartF(idc, idp){
    const product = await productsMemoryDao.getById(idp)
    const content = await fs.promises.readFile(fileRoute,'utf-8');
    const jsonContent = JSON.parse(content);
    console.log(jsonContent);
    const indexCart= jsonContent.findIndex(element=>element.id===idc)
    if(indexCart<0){
      const message = `The object with id ${idc} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const newModifiedProduct = {
        idc,
        timestamp: Date.now(),
        ...product
    }
    jsonContent[indexCart].products.push(newModifiedProduct)
    await fs.promises.writeFile(fileRoute, JSON.stringify(jsonContent, null, 2))
    return jsonContent
        
}
async deleteProductInACartByIdF(idc, idp){
    const content = await fs.promises.readFile(fileRoute,'utf-8');
    const jsonContent = JSON.parse(content);
    console.log(jsonContent);
    const indexCart= jsonContent.findIndex(element=>element.id===idc)
    if(indexCart<0){
        const message = `The object with id ${idc} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const indexProduct= jsonContent.findIndex(element=>element.id===idp)
    if(indexProduct<0){
        const message = `The object with id ${idp} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    jsonContent[indexCart].products.splice(indexProduct,1)
        await fs.promises.writeFile(fileRoute, JSON.stringify(jsonContent, null, 2))
        return `The product with id ${idp} inside the cart with id ${idc} has been deleted`
}

async getProductsOfACartF(id){
    const content = await fs.promises.readFile(`./${this.fileRoute}`,'utf-8');
    const jsonContent = JSON.parse(content);
    const indexCart= jsonContent.findIndex(element=>element.id===id)
    if(indexCart<0){
        const message = `The object with id ${id} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return jsonContent[indexCart].products
}

}

module.exports = CartsMemoryDao;