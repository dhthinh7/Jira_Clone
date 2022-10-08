import { GET_LIST_PROJECT, GET_PROJECT_MEMBERS } from "../contains/contains";

const initialState = {
  projectList: [],
  projectMembers: []
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT:
      return {...state, projectList: action.projectList};
    case GET_PROJECT_MEMBERS:
      return {...state, projectMembers: action.projectMembers}
    default:
      return state;
  }
};

export default ProjectReducer;


