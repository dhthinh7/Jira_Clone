import { baseServices } from "./baseServices";

class UserServices extends baseServices {
  getUser = (keyword) => this.get(`Users/getUser?keyword=${keyword}`);
  signInUser = (userSignin) => this.post('Users/signin', userSignin);
  signUpUser = (userSignUp) => this.post('Users/signup', userSignUp);
  editUser = (userEdit) => this.put('Users/editUser', userEdit);
  deleteUser = (userId) => this.delete(`Users/deleteUser?id=${userId}`);
}

export const userServices = new UserServices();