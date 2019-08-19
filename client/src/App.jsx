import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Lego from './Lego';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null,
      current: {}
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
  }
  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // Token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // Found a token in localStorage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            })
          }
        })
    }
  }

  liftToken({token, user}) {
    this.setState({
      token,
      user
    })
  }

  componentDidMount() {
    this.checkForLocalToken()
  }

  logout() {
    // Remove token from localStorage
    localStorage.removeItem('mernToken');
    // Remove user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  render() {
    
    var user = this.state.user
    var contents = ''
    if (user) {
      contents = (
      <>
        
        <div>
          <Route exact path="/themes" render = {() => <Lego />} />
          <Route exact path={`/api/${user._id}/`} render = {() => <Lego />} /> 
        </div>
        </>
      );
    } else {
      contents = (
        <div className='App'>
          <p>Signup or Login</p>
          <div>
            <Signup liftToken={this.liftToken}/>
            <Login liftToken={this.liftToken} />
          </div>
        </div>
      )
    }
    return (
      <Router>      
        {contents} 
      </Router>
    );
  }
}

export default App;
