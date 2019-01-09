import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import Axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    let { name, email, phone } = res.data;
    this.setState({ name, email, phone });
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone, errors } = this.state;

    name.length === 0 ? (errors['name'] = 'Name is required') : delete errors.name;
    email.length === 0 ? (errors['email'] = 'Email is required') : delete errors.email;
    phone.length === 0 ? (errors['phone'] = 'Phone Number is required') : delete errors.phone;
    this.setState({ errors });

    if (Object.keys(this.state.errors).length === 0) {
      //Clear State
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
            <div className='card mb-3'>
              <div className='card-header'>Edit Contact</div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    placeholder='Edit Your name'
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label='Email'
                    type='email'
                    name='email'
                    placeholder='Edit Your email'
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label='Phone'
                    name='phone'
                    placeholder='Edit Your Phone Number'
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <button className='btn btn-success btn-block'>Edit Contact</button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
