import React, { Component } from 'react';
import PropTypes from 'prop-types';
// For each contact design the down ARROW and Cross button
class Contact extends Component {
  // Another way to add the propTypes
  // static PropTypes = {
  //   name: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   phone: PropTypes.string.isRequired
  // };
  state = {
    showContactInfo: true
  };

  OnDeleteClick = () => {
    this.props.deleteClickHandler();
  };

  render() {
    const { name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h4>
          {name}{' '}
          <i
            onClick={() =>
              // if showContactInfo is true it will set to false and vice-varsa
              this.setState({ showContactInfo: !this.state.showContactInfo })
            }
            className="fas fa-sort-down"
            style={{ cursor: 'pointer' }}
          />
          <i // This will delete the entire contact info
            className="fas fa-times"
            style={{ cursor: 'pointer', color: 'red', float: 'right' }}
            onClick={this.OnDeleteClick}
          />
        </h4>
        {showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email} </li>
            <li className="list-group-item">Phone: {phone} </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteClickHandler: PropTypes.func.isRequired
};

export default Contact;
