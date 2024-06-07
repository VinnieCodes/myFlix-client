// action types
export const GET_MOVIES = "GET_MOVIES";
export const SET_MOVIES = "SET_MOVIES";
export const FILTER_MOVIES = "FILTER_MOVIES";

// action creators
export const getMovies = () => ({
  type: GET_MOVIES,
});
export const setMovies = (movies) => ({
  type: SET_MOVIES,
  movies,
});
export const filterMovies = (title) => ({
  type: FILTER_MOVIES,
  title,
});
