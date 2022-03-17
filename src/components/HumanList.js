import React from 'react';
import { connect } from 'react-redux';
import { addHuman } from '../store';

class HumanList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.props.addOne}>Add Human</button>
        {this.props.humans.map((human, i) => {
          return <li key={i}>{human.name}</li>;
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
  };
};

export default connect((state) => state, mapDispatchToProps)(HumanList);
