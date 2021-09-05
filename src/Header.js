import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, } from 'react-bootstrap';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="secondary" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href='/'>The Gaming Odyssey</Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/odyssey">Odysseys</Nav.Link>
            <Nav.Link href="/about-us">About Us</Nav.Link>
            {this.props.isAuthenticated ?
              <LogoutButton />
              : <LoginButton />}
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default Header;
