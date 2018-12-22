import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';

// For each contact design the down ARROW and Cross button
class Contact extends Component {
  // Another way to add the propTypes
  // static PropTypes = {
  //   name: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   phone: PropTypes.string.isRequired
  // };
  state = {
    showContactInfo: false
  };
  OnDeleteClick = (id, dispatch) => {
    // this.setState({ contacts: state.contacts.filter(contact => contact !== id) });
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={() =>
                    // if showContactInfo is true it will set to false and vice-varsa
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i // This will delete the entire contact info by onClick handler of the cross button
                  className="fas fa-times"
                  style={{ cursor: 'pointer', color: 'red', float: 'right' }}
                  onClick={this.OnDeleteClick.bind(this, id, dispatch)}
                />
              </h4>
              {showContactInfo && (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email} </li>
                  <li className="list-group-item">Phone: {phone} </li>
                </ul>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
