import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Lego from './Lego';
// import Favorites from './Favorites';
// import AddFaves from './AddFav';
// import LegoSetsList from './LegoSetsList';
import './App.css';
import {
  BrowserRouter as Router,
  //Route,
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
      current: {},
      legoSets: [],
      themes: []
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

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
    axios.get('https://rebrickable.com/api/v3/lego/themes/?key=36e941f5870960d3742c4fa017ce16fd')
      .then((res) => {
        const themes = res.data.results
        this.setState({themes}); 
      console.log("Running this many times...")
      })
  }

  showFavoriteSets() {
    //e.preventDefault()
    let config = {
        headers: {
            Authorization: `Bearer ${this.state.token}`
        }
    }
    console.log('config is: ', config)
    console.log('attempting axios call')
        axios.get('/api/sets', config).then( result => {
        console.log("this is the api response: ", result)
        this.setState({
            favoriteSets: result.data
        })
        console.log("result is: ", result.data)
    })
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
    // var user = this.state.user
    var Nav = require('react-bootstrap/Nav');
    var Navbar = require("react-bootstrap/Navbar");
    var NavDropdown = require("react-bootstrap/NavDropdown");
  
    var contents = ''
    if (this.state.user) {
      contents = (
      <>
        <h3>Hello, {this.state.user.name}</h3>
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
      <>
        <Router>
          <div>
            <Navbar fixed="top" bg="dark" variant="dark">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <NavDropdown title="Themes" id="collasible-nav-dropdown">
                  {this.state.themes.map((theme, id) => ( 
                  <NavDropdown.Item as={Link } to={'/themes'} key={id}>{theme.name}</NavDropdown.Item>
                  ))
                } 
                </NavDropdown>
                <Nav.Link as={Link} to='/sets'>Sets</Nav.Link>
                <Nav.Link as={Link} to='/favorites'>Favorites</Nav.Link>
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            <br />
          </div>     
          {contents}
          <div>
          <Lego user={this.state.user} token={this.state.token}/> 
        </div>
        </Router>
      </>
    );
  }
}

export default App;
