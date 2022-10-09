import { GET_TYPE } from "../contains/contains";

const initialState = {
  listType: []
};

export const TypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TYPE:
      return { ...state, listType: action.listType };

    default:
      return {...state};
  }
};

