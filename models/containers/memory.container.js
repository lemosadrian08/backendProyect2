/* const { v4: uuid } = require("uuid");
const { HTTP_STATUS } = require("../../constants/api.constants");
const { HttpError } = require("../../utils/api.utils"); */


class MemoryContainer {
  constructor(collection, fileRoute) {
    this.name = fileRoute
    /* this.items = [];
    this.resource = resource; */
  }

  async save(newProduct){
    try{
        const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
        const jsonContent = JSON.parse(content);
        let max = 0
        jsonContent.forEach(element => {
            if(element.id > max){
                max = element.id
            }
        })
        const newId = max+1
        const { name, description, code, price, img, timestamp } =newProduct
        const newModifiedProduct = {
            name,
            description,
            code,
            price,
            img,
            timestamp: Date.now(),
            id: newId
        }
        jsonContent.push(newModifiedProduct)
        await fs.promises.writeFile(`./${this.name}`, JSON.stringify(jsonContent, null, 2))
        return newModifiedProduct
    }
    catch(error){
        console.log(error.message);
    }
}
async getAll(){
    try{
        const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
        const jsonContent = JSON.parse(content);
        return jsonContent
    }
    catch(error){
        console.log(error.message);
    }
}
async getById(id){
    try{
        const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
        const jsonContent = JSON.parse(content);
        const filteredContent = jsonContent.filter(element=>element.id===+id)
        if(filteredContent<0){
            return{error: `Product with id:${id} does not exist`}
        }else{
            return filteredContent
        }
    }
    catch(error){
        console.log(error.message);
    }
}
async deleteById(id){
    try{
        const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
        const jsonContent = JSON.parse(content);
        const indexProduct= jsonContent.findIndex(element=>element.id===+id)
        if(indexProduct<0){
            return{error: `Product with id:${id} does not exist`}
        }else{
            jsonContent.splice(indexProduct,1)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(jsonContent, null, 2))
            return `The product with id ${id} has been deleted`
        }
    }
    catch(error){
        console.log(error.message);
    }
}
async update(id, productToUpdate){
    try{
        const { name, description, code, price, img, timestamp } = productToUpdate;
        if( !name || !description || !code || !price || !img || !timestamp ) {
            return {error: "Wrong body format"}
        }
        const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
        const jsonContent = JSON.parse(content);
        const indexProduct= jsonContent.findIndex(element=>element.id===+id)
        if(indexProduct<0){
            return{error: `Product with id:${id} does not exist`}
        }
        const updatedProduct = {
            ...jsonContent[indexProduct],
            name,
            description,
            code,
            price,
            img,
            timestamp: Date.now()
        }
        jsonContent[indexProduct] = updatedProduct
        await fs.promises.writeFile(`./${this.name}`, JSON.stringify(jsonContent, null, 2))
        return updatedProduct
    }
    catch(error){
        console.log(error.message);
    }
}





/* 
  getById(id) {
    const item = this.items.find(item => item.id === id);
    if (!item) {
      const message = `${this.resource} with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return item;
  }

  save(item) {
    const newItem = {
      id: uuid(),
      ...item
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id, item) {
    const index = this.items.findIndex(item => item.id === id);
    if (index < 0) {
      const message = `${this.resource} with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const updatedItem = {
      id,
      ...item
    };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  delete(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index < 0) {
      const message = `${this.resource} with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return this.items.splice(index, 1);
  } */
} 

module.exports = MemoryContainer;