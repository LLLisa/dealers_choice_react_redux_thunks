import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunks from 'redux-thunk';
import axios from 'axios';

//action types-----------------------------
const LOAD = 'LOAD';

//action creators--------------------------
export const load = (list) => {
  return {
    type: LOAD,
    humanList: list,
  };
};

//thunks-----------------------------------
// const fetchHumans = () => {
//   return async (dispatch) => {
//     console.log('thunk hi');
//     //trycatch!!!
//     const response = await axios.get('/api/humans');
//     console.log(response.data);
//     //use action creator
//     dispatch({ type: LOAD, humanList: response.data });
//   };
// };

/*Remember, an action creator is a function that returns an object. A thunk, on the other hand, is a function that returns a function that takes dispatch as a parameter!  */

//when something gets dispatched to reducer, if object it will go through
//if function, thunk midware will call it and send the result to reducer

//export thunks instead if action creators

const initialState = {
  humanList: [
    { name: 'human1' },
    { name: 'human2' },
    { name: 'human3' },
    { name: 'human4' },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return { ...state, humanList: action.humanList };
    }
  }
  return state; //reducer ALWAYS RETURN STATE
};

const store = createStore(reducer, applyMiddleware(thunks, logger));
// console.log(store);

// export { fetchHumans };
export default store;
