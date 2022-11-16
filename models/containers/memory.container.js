const { v4: uuid } = require("uuid");
const { HTTP_STATUS } = require("../../constants/api.constants");
const { HttpError } = require("../../utils/api.utils");
const fs = require('fs');



class MemoryContainer {
  constructor(fileRoute) {
    this.fileRoute = fileRoute
    this.items = [];

  }

  async getAll(){
    const content = await fs.promises.readFile(`./${this.fileRoute}`,'utf-8');
    const jsonContent = JSON.parse(content);
    return jsonContent
  }

  async getById(id){
    const content = await fs.promises.readFile(`./${this.fileRoute}`,'utf-8');
    const jsonContent = JSON.parse(content);
    console.log(jsonContent);
    const item = jsonContent.find(element=>element.id===id)
    if(!item){
        const message = `The object with id ${id} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return item
  }

  async save(item){
    const content = await fs.promises.readFile(`./${this.fileRoute}`,'utf-8');
    const jsonContent = JSON.parse(content);
    const newItem = {
      id: uuid(),
      timestamp: Date.now(),
      ...item
    };
    jsonContent.push(newItem)
    await fs.promises.writeFile(`./${this.fileRoute}`, JSON.stringify(jsonContent, null, 2))
    return  newItem

  }

  async update(id, productToUpdate){
    const { name, description, code, price, img } = productToUpdate;
    if( !name || !description || !code || !price || !img ) {
      const message = `Wrong body format`;
      throw new HttpError(HTTP_STATUS.FORBIDDEN, message);
    }
    const content = await fs.promises.readFile(`./${this.fileRoute}`,'utf-8');
    const jsonContent = JSON.parse(content);
    const indexProduct= jsonContent.findIndex(element=>element.id===id)
    if(indexProduct<0){
      const message = `The object with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const updatedProduct = {
        id,
        timestamp: Date.now(),
        ...productToUpdate
    }
    jsonContent[indexProduct] = updatedProduct
    await fs.promises.writeFile(`./${this.fileRoute}`, JSON.stringify(jsonContent, null, 2))
    return updatedProduct
  }

  async delete(id){
    const content = await fs.promises.readFile(`./${this.fileRoute}`,'utf-8');
    const jsonContent = JSON.parse(content);
    const indexProduct= jsonContent.findIndex(element=>element.id===id)
    if(indexProduct<0){
      const message = `The object with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    jsonContent.splice(indexProduct,1)
    await fs.promises.writeFile(`./${this.fileRoute}`, JSON.stringify(jsonContent, null, 2))
    return `The object with id ${id} has been deleted`
}

}

module.exports = MemoryContainer;