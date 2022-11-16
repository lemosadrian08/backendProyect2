const MemoryContainer = require("../../containers/memory.container");




const collection = "memory";
class ProductsMemoryDao extends MemoryContainer {
    constructor() {
    super("/DB/data/products.json");
  } 
}


module.exports = ProductsMemoryDao;