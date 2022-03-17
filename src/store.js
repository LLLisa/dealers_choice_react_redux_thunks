import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

//action types-----------------------------
const LOAD_HUMANS = 'LOAD_HUMANS';
const ADD_HUMAN = 'ADD_HUMAMS';
const REMOVE_HUMAN = 'REMOVE_HUMANS';
const LOAD_COMPANIES = 'LOAD_COMPANIES';
const ADD_COMPANY = 'ADD_COMPANIES';
const REMOVE_COMPANY = 'REMOVE_COMPANIES';

//action creators--------------------------
/*
I had a bunch of action creators here, but it was a big hassle updating
them every time I changed something and with thunks, it seemed pointless to 
have these actions created to have them used only once in 
this same file. 
*/

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

export const loadCompanies = () => {
  return async (dispatch) => {
    const companies = (await axios.get('/api/companies')).data;
    console.log(companies);
    dispatch({ type: LOAD_COMPANIES, companies });
  };
};

export const addCompany = () => {
  return async (dispatch) => {
    const newCompany = (await axios.post('/api/companies')).data;
    dispatch({ type: ADD_COMPANY, newCompany });
  };
};

export const removeCompany = (company) => {
  return async (dispatch) => {
    await axios.delete(`/api/companies/${company.id}`);
    dispatch({ type: REMOVE_COMPANY, company });
  };
};

//reducers----------------------------
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

const companyReducer = (companies = [], action) => {
  switch (action.type) {
    case LOAD_COMPANIES: {
      return action.companies;
    }
    case ADD_COMPANY: {
      return [...companies, action.newCompany];
    }
    case REMOVE_COMPANY: {
      return companies.filter((x) => x.id !== action.company.id);
    }
  }
  return companies;
};

const reducer = combineReducers({
  humans: humanReducer,
  companies: companyReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
