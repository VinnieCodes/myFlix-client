import { GET_MOVIES, SET_MOVIES, FILTER_MOVIES } from "../actions";

const todos = (state = [], action) => {
  switch (action.type) {
    case GET_MOVIES:
      return [...state];
    case FILTER_MOVIES:
      return state.filter((movie, index) => title === action.title);
    case SET_MOVIES:
      return [...state];
    default:
      return state;
  }
};
export default todos;
