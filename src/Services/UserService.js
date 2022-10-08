import { baseServices } from "./baseServices";

class UserServices extends baseServices {
  getUser = (keyword) => this.get(`Users/getUser?keyword=${keyword}`)
}

export const userServices = new UserServices();