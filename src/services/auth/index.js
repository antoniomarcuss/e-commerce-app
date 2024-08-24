import httpClient from "../axios";
const MODULE = "/auth";
export class AuthService {
  static async register(data) {
    return await httpClient.post(`${MODULE}/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }
  static async login(data) {
    return await httpClient.post(`${MODULE}/login`, {
      email: data.email,
      password: data.password,
    });
  }
}
