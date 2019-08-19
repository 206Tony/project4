import React from 'react'
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


function Nav({themes, legoThemes}) {
  var Nav = require('react-bootstrap/Nav');
  var Navbar = require("react-bootstrap/Navbar");
  var NavDropdown = require("react-bootstrap/NavDropdown");

  // var themeContent;
  //   if (themes.length - 1) {
  //     themeContent = themes.map((theme, id) => {
        return (
          <div>
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Themes" id="collasible-nav-dropdown">
                  <NavDropdown.Item href={`/${themes}`}>{legoThemes}</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href='/sets'>Sets</Nav.Link>
                <Nav.Link href={'/favorites/'}>Favorites</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            <br />
          </div>     
      )
    // })
  // } else {
  //   themeContent = <p>No sets found!</p>
  // }
  // return (
  //   {themeContent}
  // )
}

export default Nav;
