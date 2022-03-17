import axios from 'axios';

//action constants--------------
const LOAD_HUMANS = 'LOAD_HUMANS';
const ADD_HUMAN = 'ADD_HUMAMS';
const REMOVE_HUMAN = 'REMOVE_HUMANS';

//thunks-----------------------------------
export const loadHumans = () => {
  return async (dispatch) => {
    const humans = (await axios.get('/api/humans')).data;
    dispatch({ type: LOAD_HUMANS, humans });
  };
};

export const addHuman = () => {
  return async (dispatch) => {
    const newHuman = (await axios.post('/api/humans')).data;
    dispatch({ type: ADD_HUMAN, newHuman });
  };
};

export const removeHuman = (human) => {
  return async (dispatch) => {
    await axios.delete(`/api/humans/${human.id}`);
    dispatch({ type: REMOVE_HUMAN, human });
  };
};

//reducer----------------------------
const humanReducer = (humans = [], action) => {
  switch (action.type) {
    case LOAD_HUMANS: {
      return action.humans;
    }
    case ADD_HUMAN: {
      return [...humans, action.newHuman];
    }
    case REMOVE_HUMAN: {
      return humans.filter((x) => x.id !== action.human.id);
    }
  }
  return humans;
};

export default humanReducer;
