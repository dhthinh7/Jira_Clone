import { CLOSE_FORM_DRAWER, OPEN_FORM_DRAWER } from "../contains/contains";

const initialState = {
  isOpen: false,
  title: '',
  Component: <div></div>,
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_FORM_DRAWER:
      return { ...state, isOpen: true, title: action.title, Component: action.Component };
    case CLOSE_FORM_DRAWER:
      return { ...state, isOpen: false };
    default:
      return { ...state };
  }
};


