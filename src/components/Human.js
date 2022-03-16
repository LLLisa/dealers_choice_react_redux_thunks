import React from 'react';
import { connect } from 'react-redux';

const Human = (props) => {
  // console.log(props);
  return <span>{props.humanList[props.index]}</span>;
};

const mapStateToProps = (state) => ({ humanList: state.humanList });

export default connect(mapStateToProps)(Human);
