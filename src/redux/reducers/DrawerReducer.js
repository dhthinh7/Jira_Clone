import { CLOSE_FORM_DRAWER, OPEN_FORM_DRAWER, SET_SUBMIT_TASK } from "../contains/contains";

const initialState = {
  isOpen: false,
  // Default value
  custom: {
    title: '',
    height: '100%',
    width: "720px",
    placement: "right"
  },
  Component: <div></div>,
  callBackSubmit: (propsValue) => { alert('click') }
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_FORM_DRAWER:
      return { ...state, isOpen: true, custom: { ...state.custom, ...action.custom }, Component: action.Component };
    case CLOSE_FORM_DRAWER:
      return { ...state, isOpen: false };
    case SET_SUBMIT_TASK:
      return { ...state, callBackSubmit: action.callBackSubmit };
    default:
      return { ...state };
  }
};


