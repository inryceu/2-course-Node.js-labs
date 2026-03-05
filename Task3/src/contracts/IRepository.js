export class IRepository {
  async getAll() {
    throw new Error("Method 'getAll()' must be implemented.");
  }
  async getById(id) {
    throw new Error("Method 'getById()' must be implemented.");
  }
  async create(data) {
    throw new Error("Method 'create()' must be implemented.");
  }
  async delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }
  async update(id, data) {
    throw new Error("Method 'update()' must be implemented.")
  }
}
