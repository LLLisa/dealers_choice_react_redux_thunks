import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

//action types-----------------------------
const LOAD = 'LOAD';
const ADD = 'ADD';
const REMOVE = 'REMOVE';

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
    type: REMOVE,
    human: human,
  };
};

//thunks-----------------------------------
export const loadHumans = () => {
  return async (dispatch) => {
    const humans = (await axios.get('/api/humans')).data;
    dispatch(load(humans));
  };
};

export const addHuman = () => {
  return async (dispatch) => {
    const newHuman = (await axios.post('/api/humans')).data;
    dispatch(add(newHuman));
  };
};

export const removeHuman = (human) => {
  return async (dispatch) => {
    await axios.delete(`/api/humans/${human.id}`);
    dispatch(remove(human));
  };
};

//reducer----------------------------
const humanReducer = (humans = [], action) => {
  switch (action.type) {
    case LOAD: {
      return action.humanList;
    }
    case ADD: {
      return [...humans, action.human];
    }
    case REMOVE: {
      return humans.filter((x) => x.id !== action.human.id);
    }
  }
  return humans;
};

const reducer = combineReducers({
  humans: humanReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
