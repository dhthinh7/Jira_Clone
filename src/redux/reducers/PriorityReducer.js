import { GET_PRIORITY } from "../contains/contains";

const initialState = {
  listPriority: []
};

export const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIORITY:
      return {...state, listPriority: action.listPriority};
    default:
      return {...state};
  }
};
