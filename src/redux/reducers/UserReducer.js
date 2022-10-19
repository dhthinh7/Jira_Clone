import { USER_LOGIN } from "../../utils/constain/setting";
import { EDIT_USER, GET_USER, SEARCH_TEMP } from "../contains/contains";

const initialState = {
  userSearch: [],
  userLogin: {},
  userEdit: {},
  searchTemp: ''
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userSearch: action.userSearch };
    case USER_LOGIN:
      return { ...state, userLogin: action.userLogin};
    case EDIT_USER:
      return { ...state, userEdit: action.userEdit };
    case SEARCH_TEMP:
      return { ...state, searchTemp: action.searchTemp};
    default:
      return { ...state };
  }
};
