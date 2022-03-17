import React from 'react';
import { connect } from 'react-redux';
import { addCompany, removeCompany } from '../store';

class CompanyList extends React.Component {
  render() {
    return (
      <div>
        <button style={{ margin: '1rem' }} onClick={this.props.addOne}>
          Add Company
        </button>
        {this.props.companies.map((company, i) => {
          return (
            <li key={i}>
              <span>{company.name}</span>
              <span>
                <button
                  style={{ margin: '1rem' }}
                  onClick={() => this.props.removeOne(company)}
                >
                  remove company
                </button>
              </span>
              <div> - {company.tagline}</div>
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
      await dispatch(addCompany());
    },
    removeOne: async (human) => {
      await dispatch(removeCompany(human));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(CompanyList);
