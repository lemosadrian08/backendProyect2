const MemoryContainer = require("../../containers/memory.container");
const fs = require('fs');
const { v4: uuid } = require("uuid");
const ProductsMemoryDao = require('../products/products.memory.dao')

/* const { HTTP_STATUS } = require("../../constants/api.constants");
const { HttpError } = require("../../utils/api.utils"); */

const productsMemoryDao = new ProductsMemoryDao("/DB/data/products.json")
const memoryContainer = new MemoryContainer("./DB/data/carts.json")

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
        /* 
        const indexCart= jsonContent.findIndex(element=>element.id===+id) */
        
        const content = await fs.promises.readFile(fileRoute,'utf-8');
        const jsonContent = JSON.parse(content);
        const product = await productsMemoryDao.getById(idp)
        const cart = await memoryContainer.getById(idc)
        cart.products.push(product)
        console.log(cart);
        await fs.promises.writeFile(fileRoute, JSON.stringify(jsonContent, null, 2))
        return cart


        
        /* const { name, description, code, price, img, timestamp}= newProduct
        if(indexCart<0){
            return{error: `The Cart with id ${id} does not exist`}
        }else if( !name || !description || !code || !price || !img || !timestamp) {
            return {error: "Wrong body format"}
        }else{
            let max = 0
            jsonContent[indexCart].products.forEach(element => {
            if(element.id > max){
                max = element.id
            }})
            const newId = max+1
            const newModifiedProduct = {
                name,
                description,
                code,
                price,
                img,
                timestamp,
                id: newId
            }
            jsonContent[indexCart].products.push(newModifiedProduct)
            await fs.promises.writeFile(`./${this.route}`, JSON.stringify(jsonContent, null, 2))
            return newModifiedProduct */
        
}
async deleteProductInACartById(idc, idp){
    try{
        const content = await fs.promises.readFile(`./${this.route}`,'utf-8');
        const jsonContent = JSON.parse(content);
        const indexCart= jsonContent.findIndex(element=>element.id===+idc)
        if(indexCart<0){
            return{error: `The Cart with id ${id} does not exist`}
        }else{
            const indexProduct=jsonContent[indexCart].products.findIndex(element=>element.id===+idp)
            if(indexProduct<0){
                return{error: `The product with id ${indexProduct} does not exist`}
            }
            jsonContent[indexCart].products.splice(indexProduct,1)
            await fs.promises.writeFile(`./${this.route}`, JSON.stringify(jsonContent, null, 2))
            return `The product with id ${idp} inside the cart with id ${idc} has been deleted`
        }
    }
    catch(error){
        console.log(error.message);
    }
}
async getProductsOfACart(id){
    try{
        const content = await fs.promises.readFile(`./${this.route}`,'utf-8');
        const jsonContent = JSON.parse(content);
        const indexCart= jsonContent.findIndex(element=>element.id===+id)
        if(indexCart<0){
            return{error: `The cart with id:${id} does not exist`}
        }else{
            return jsonContent[indexCart].products
        }
    }
    catch(error){
        console.log(error.message);
    }
}

}

module.exports = CartsMemoryDao;