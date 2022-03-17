import axios from 'axios';

//action constants-----------------------------
const LOAD_COMPANIES = 'LOAD_COMPANIES';
const ADD_COMPANY = 'ADD_COMPANIES';
const REMOVE_COMPANY = 'REMOVE_COMPANIES';

//thunks-----------------------------------
export const loadCompanies = () => {
  return async (dispatch) => {
    const companies = (await axios.get('/api/companies')).data;
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

//reducer----------------------------
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

export default companyReducer;
