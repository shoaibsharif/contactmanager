import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    if (name.length === 0) {
      let errors = this.state.errors;
      errors['name'] = 'Name is required';
      this.setState({ errors });
    } else {
      let errors = this.state.errors;
      delete errors.name;
      this.setState({ errors });
    }
    if (email.length === 0) {
      let errors = this.state.errors;
      errors['email'] = 'Email is required';
      this.setState({ errors });
    } else {
      let errors = this.state.errors;
      delete errors.email;
      this.setState({ errors });
    }
    if (phone.length === 0) {
      let errors = this.state.errors;
      errors['phone'] = 'Phone is required';
      this.setState({ errors });
    } else {
      let errors = this.state.errors;
      delete errors.phone;
      this.setState({ errors });
    }

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    if (Object.keys(this.state.errors).length === 0) {
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      this.setState({ name: '', email: '', phone: '', errors: {} });
      this.props.history.push('/');
    }
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Your name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Your email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <button className="btn btn-success btn-block">Add Contact</button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
