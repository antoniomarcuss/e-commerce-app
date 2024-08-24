import httpClient from "../axios";

const MODULE = "users";
export class UsersService {
  static async find(page, perPage) {
    return await httpClient.get(MODULE, {
      params: { page, perPage },
    });
  }
  static async getMe() {
    return await httpClient.get(`${MODULE}/me`);
  }

  static async findById(userId) {
    return await httpClient.get(`${MODULE}/${userId}`);
  }
  static async delete(userId) {
    return await httpClient.delete(`${MODULE}/${userId}`);
  }
}
