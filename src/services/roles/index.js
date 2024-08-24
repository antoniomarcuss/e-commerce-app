import httpClient from "../axios";
const MODULE = "/roles";
export class RolesService {
  static async findAll() {
    return await httpClient.get(MODULE);
  }
}
