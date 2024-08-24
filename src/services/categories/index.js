import httpClient from "../axios";
const MODULE = "/categories";
export class CategoriesService {
  static async findAll() {
    return await httpClient.get(`${MODULE}`);
  }
  static async findById(id) {
    return await httpClient.get(`${MODULE}/${id}`);
  }

  static async create(data) {
    return await httpClient.post(`${MODULE}`, data);
  }

  static async update(categoryId, data) {
    return await httpClient.put(`${MODULE}/${categoryId}`, data);
  }
  static async delete(categoryId) {
    return await httpClient.delete(`${MODULE}/${categoryId}`);
  }
}
