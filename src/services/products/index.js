import httpClient from "../axios";

const MODULE = "/products";

export class ProductsService {
  static async findAll(page, perPage) {
    return await httpClient.get(MODULE, {
      params: {
        page,
        perPage,
      },
    });
  }
  static async findById(id) {
    return await httpClient.get(`${MODULE}/${id}`);
  }
  static async search(value) {
    return await httpClient.get(`${MODULE}/search/${value}`);
  }

  static async create(body) {
    return await httpClient.post(`${MODULE}`, body);
  }
  static async update(id, body) {
    return await httpClient.put(`${MODULE}/${id}`, body);
  }

  static async upload(id, body) {
    return await httpClient.post(`${MODULE}/${id}/uploadImage`, body);
  }
  static async delete(id) {
    return await httpClient.delete(`${MODULE}/${id}`);
  }
}
