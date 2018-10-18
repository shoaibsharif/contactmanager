import React, { Component } from 'react';

// Creating a js where we can access the contacts file globally

const Context = React.createContext();

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        phone: '55-555-5555'
      },
      {
        id: 2,
        name: 'Karen Doe',
        email: 'jdoe@gmail.com',
        phone: '55-555-5555'
      },
      {
        id: 3,
        name: 'Henry Doe',
        email: 'jdoe@gmail.com',
        phone: '55-555-5555'
      }
    ]
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
