import React from 'react';
import { connect } from 'react-redux';
import HumanList from './HumanList';
import { loadHumans } from '../store';
import axios from 'axios';

class Main extends React.Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <ul>
        <HumanList />
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: async () => {
      await dispatch(loadHumans());
    },
  };
};

export default connect(null, mapDispatchToProps)(Main);
