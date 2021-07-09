import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, ADD_MOVIE, DELETE_MOVIE } from '../actions/actions';


// reducer - when concerned by the action, it returns a new value
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

// reducer
function movies(state = [], action) {
  // switches between action types - finds what is concerned
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    // case ADD_MOVIE:
    //   return action.value;
    // case DELETE_MOVIE:
    //   return action.value;
    default:
      return state;
  }
}

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }

const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;