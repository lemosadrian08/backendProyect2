const MemoryContainer = require("../../containers/memory.container");



const fileRoute = '../../../DB/data/products.json' 
const collection = "memory";
class ProductsMemoryDao extends MemoryContainer {
  constructor() {
    super(collection, fileRoute);
  }

}


module.exports = ProductsMemoryDao;