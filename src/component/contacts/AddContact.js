import React, { Component } from 'react'
import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup'
import Axios from 'axios'
import { connect } from 'net'

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })
  onSubmit = async (dispatch, e) => {
    e.preventDefault()
    const { name, email, phone, errors } = this.state

    name.length === 0 ? (errors['name'] = 'Name is required') : delete errors.name
    email.length === 0 ? (errors['email'] = 'Email is required') : delete errors.email
    phone.length === 0 ? (errors['phone'] = 'Phone Number is required') : delete errors.phone
    this.setState({ errors })

    const newContact = {
      name,
      email,
      phone
    }

    if (Object.keys(this.state.errors).length === 0) {
      const res = await Axios.post('https://jsonplaceholder.typicode.com/users', newContact)
      dispatch({ type: 'ADD_CONTACT', payload: res.data })

      //Clear State
      this.setState({ name: '', email: '', phone: '', errors: {} })
      this.props.history.push('/')
    }
  }

  render() {
    const { name, email, phone, errors } = this.state

    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className='card mb-3'>
              <div className='card-header'>Add Contact</div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    placeholder='Enter Your name'
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label='Email'
                    type='email'
                    name='email'
                    placeholder='Enter Your email'
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label='Phone'
                    name='phone'
                    placeholder='Enter Your Phone Number'
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <button className='btn btn-success btn-block'>Add Contact</button>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
export default AddContact
