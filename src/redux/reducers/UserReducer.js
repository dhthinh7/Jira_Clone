import { USER_LOGIN } from "../../utils/constain/setting";
import { GET_USER } from "../contains/contains";

const initialState = {
  userSearch: [],
  userLogin: {
    // id: 2619,
    // email: "tdthinh7@gmail.com",
    // avatar: "https://ui-avatars.com/api/?name=thinh",
    // phoneNumber: "111111111",
    // name: "thinh",
    // accessToken: "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZHRoaW5oN0BnbWFpbC5jb20iLCJuYmYiOjE2NjU0MTMzMTgsImV4cCI6MTY2NTQxNjkxOH0.e2ubYCYYsA9nVpjF92JKs8f3ciEzj3r50APxhPoMVko"
  }
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userSearch: action.userSearch };
    case USER_LOGIN:
      return { ...state, userLogin: action.userLogin}
    default:
      return { ...state };
  }
};
