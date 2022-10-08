import { GET_ALL_STATUS } from "../contains/contains";

const initialState = {
  listStatus : []
};

export const StatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATUS:
      return { ...state, listStatus: action.listStatus };

    default:
      return {...state};
  }
};
