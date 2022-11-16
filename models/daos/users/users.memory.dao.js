const MemoryContainer = require("../../containers/memory.container");

const collection = "users";
class UsersMemoryDao extends MemoryContainer {
  constructor() {
    super(collection);
  }
}

module.exports = UsersMemoryDao;