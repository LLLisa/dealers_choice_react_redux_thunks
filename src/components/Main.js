import React from 'react';
import { connect } from 'react-redux';
import HumanList from './HumanList';
import { load } from '../store';
import axios from 'axios';

class Main extends React.Component {
  componentDidMount() {
    console.log(this.props);
    // this.props.init();
  }

  render() {
    return (
      <ul>
        <HumanList />
      </ul>
    );
  }
}

const mapDispatchToProps = async (dispatch) => {
  const humans = await axios.get('/api/humans');
  console.log('humans', humans.data);
  return dispatch(load(humans.data));
};

export default connect(null, mapDispatchToProps)(Main);
