import { GET_ALL_PROJECT_CATEGORY } from "../contains/contains";

const initialState = {
  listCategory: []
};

export const ProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY:
      return { ...state, listCategory: action.listCategory };

    default:
      return {...state};
  }
};
