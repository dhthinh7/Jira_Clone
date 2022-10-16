import { GET_ALL_COMMENTS } from "../contains/contains";

const initialState = {
  listComments: []
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return { ...state, listComments: action.listComments };
    default:
      return { ...state };
  }
};
