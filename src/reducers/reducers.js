import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, ADD_MOVIE, DELETE_MOVIE, SET_USER } from '../actions/actions';


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
    case ADD_MOVIE:
      // returns all movies plus new movie
      return [...state, action.value];
    case DELETE_MOVIE:
      return state.filter(movie => movie._id !== action.value);
    default:
      return state;
  }
}

function user(state = '', action) {
  switch(action.type) {
        case SET_USER:
            return action.value;
        
        default:
            return state;
    }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;