import { GET_USER } from "../contains/contains";

const initialState = {
  userSearch: []
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {...state, userSearch: action.userSearch};

    default:
      return {...state};
  }
};
