import React from 'react';
import { connect } from 'react-redux';
import HumanList from './HumanList';
import CompanyList from './CompanyList';
import { loadHumans, loadCompanies } from '../store';

class Main extends React.Component {
  componentDidMount() {
    this.props.initHumans();
    this.props.initCompanies();
  }

  render() {
    return (
      <ul>
        <HumanList />
        <CompanyList />
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initHumans: async () => {
      await dispatch(loadHumans());
    },
    initCompanies: async () => {
      await dispatch(loadCompanies());
    },
  };
};

export default connect(null, mapDispatchToProps)(Main);
