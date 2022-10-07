import { GET_LIST_PROJECT } from "../contains/contains";

const initialState = {
  projectList: []
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT:
      return {...state, projectList: action.projectList}
    default:
      return state;
  }
};

export default ProjectReducer;


