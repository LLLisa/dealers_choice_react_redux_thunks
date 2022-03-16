import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import Human from './Human';

const HumanList = (props) => {
  // console.log('props', props);
  return (
    <div>
      <button>Add Human</button>
      {props.humanList.map((human, i) => {
        return (
          <li key={i}>
            {human.name} -{human.phone}
          </li>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { humanList: state.humanList };
};

export default connect(mapStateToProps)(HumanList);
