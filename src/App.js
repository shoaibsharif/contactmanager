import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './component/contacts/Contacts';
import Header from './component/layout/Header';
import About from './component/pages/About';
import { Provider } from './context';
import AddContact from './component/contacts/AddContact';
import EditContact from './component/contacts/EditContact';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NotFound from './component/pages/NotFound';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className='App'>
            <Header branding='Contact Manager' />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Contacts} />
                <Route exact path='/about' component={About} />
                <Route exact path='/add' component={AddContact} />
                <Route exact path='/edit/:id' component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
