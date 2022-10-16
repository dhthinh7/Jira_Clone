import { baseServices } from "./baseServices";

class UserServices extends baseServices {
  getUser = (keyword) => this.get(`Users/getUser?keyword=${keyword}`);
  signInUser = (userSignin) => this.post('api/Users/signin');
  signUpUser = (userSignUp) => this.post('api/Users/signup');
}

export const userServices = new UserServices();