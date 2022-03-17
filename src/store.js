import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

//action types-----------------------------
const LOAD = 'LOAD';
const ADD = 'ADD';
const DELETE = 'DELETE';

//action creators--------------------------
export const load = (list) => {
  return {
    type: LOAD,
    humanList: list,
  };
};

export const add = (human) => {
  return {
    type: ADD,
    human: human,
  };
};

export const remove = (human) => {
  return {
    type: DELETE,
    human: human,
  };
};

//thunks-----------------------------------
export const addHuman = () => {
  return async (dispatch) => {
    const newHuman = (await axios.post('/api/humans')).data;
    dispatch(add(newHuman));
  };
};

export const loadHumans = () => {
  return async (dispatch) => {
    const humans = (await axios.get('/api/humans')).data;
    dispatch(load(humans));
  };
};

//reducer----------------------------

const initialState = {
  humanList: [],
};

const humanReducer = (humans = [], action) => {
  switch (action.type) {
    case LOAD: {
      return action.humanList;
    }
    case ADD: {
      return [...humans, action.human];
    }
  }
  return humans;
};

const reducer = combineReducers({
  humans: humanReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

/*Remember, an action creator is a function that returns an object. A thunk, on the other hand, is a function that returns a function that takes dispatch as a parameter!  */

//when something gets dispatched to reducer, if object it will go through
//if function, thunk midware will call it and send the result to reducer

//export thunks instead if action creators
