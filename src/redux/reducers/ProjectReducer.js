import { EDIT_PROJECT, GET_LIST_PROJECT, GET_PROJECT_MEMBERS } from "../contains/contains";

const initialState = {
  projectList: [],
  projectMembers: [],
  projectEdit: {
    id: 123
  }
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT:
      return {...state, projectList: action.projectList};
    case GET_PROJECT_MEMBERS:
      return {...state, projectMembers: action.projectMembers};
    case EDIT_PROJECT:
      return {...state, projectEdit: action.projectEdit};
    default:
      return state;
  }
};

export default ProjectReducer;


