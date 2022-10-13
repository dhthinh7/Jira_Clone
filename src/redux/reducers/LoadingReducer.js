import { HIDE_LOADER, SHOW_LOADER } from "../contains/contains";

const initialState = {
  isVisible: false
};

export const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, isVisible: true };
    case HIDE_LOADER:
      return {...state, isVisible: false};
    default:
      return state;
  }
};
