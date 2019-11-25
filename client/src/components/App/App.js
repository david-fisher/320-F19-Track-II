import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from "universal-cookie";
import Routes from "../Routes/Routes";
import {
  Nav,
  Navbar,
  Dropdown,
  NavItem,
  Container,
  Jumbotron
} from "react-bootstrap";
import { Route, withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    this.state = {
      token: cookies.get("token"),
      name: cookies.get("name"),
      cookie: cookies
    };
  }

  logout = event => {
    this.state.cookie.remove("name");
    this.state.cookie.remove("token");
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/home">Orchard Watch</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Nav className="justify-content-end">
            {this.state.token === undefined && (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {this.state.token !== undefined && (
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={Nav.Link}>
                  {this.state.name}
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight={true}>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
