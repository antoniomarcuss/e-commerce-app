import httpClient from "../axios";
const MODULE = "/carts";
export class CartsService {
  static async find() {
    return await httpClient.get(MODULE);
  }
  static async addItem(productId, quantity) {
    return await httpClient.post(`${MODULE}/addItem`, { productId, quantity });
  }

  static async updateItem(productId, quantity) {
    return await httpClient.patch(`${MODULE}/updateItem/${productId}`, {
      quantity,
    });
  }

  static async deleteItem(productId) {
    return await httpClient.delete(`${MODULE}/deleteItem/${productId}`);
  }
}
