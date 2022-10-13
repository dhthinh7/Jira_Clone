import { EDIT_PROJECT, GET_LIST_PROJECT, GET_PROJECT_DETAIL } from "../contains/contains";

const initialState = {
  projectList: [],
  projectMembers: [],
  projectEdit: {},
  projectDetail: {}
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT:
      return { ...state, projectList: action.projectList };
    case EDIT_PROJECT:
      return { ...state, projectEdit: action.projectEdit };
    case GET_PROJECT_DETAIL:
      return { ...state, projectDetail: action.projectDetail };
    default:
      return state;
  }
};

export default ProjectReducer;


