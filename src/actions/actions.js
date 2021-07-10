// declares action types
export const SET_MOVIES = 'SET_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function addMovie(value) {
  return { type: ADD_MOVIE, value };
}

export function deleteMovie(value) {
  return { type: DELETE_MOVIE, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}