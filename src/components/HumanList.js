import React from 'react';
import { connect } from 'react-redux';
import { addHuman, removeHuman } from '../store/human-store';

class HumanList extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.addOne}>Add Human</button>
        {this.props.humans.map((human, i) => {
          return (
            <li key={i}>
              {human.name}
              <button onClick={() => this.props.removeOne(human)}>
                remove human
              </button>
            </li>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOne: async () => {
      await dispatch(addHuman());
    },
    removeOne: async (human) => {
      await dispatch(removeHuman(human));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(HumanList);
