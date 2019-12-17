import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from "universal-cookie";
import Routes from "../Routes/Routes";
import { Nav, Navbar, Dropdown, NavItem } from "react-bootstrap";

export default function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const name = cookies.get("name");

  function logout() {
    cookies.remove("name");
    cookies.remove("token");
    window.location.reload();
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">Orchard Watch</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
          <Nav.Link href="/orchards">Orchards</Nav.Link>
          <Nav.Link href="/data">Data</Nav.Link>
          <Nav.Link href="/gallery">Gallery</Nav.Link>
          <Nav.Link href="/observations">Observations</Nav.Link>
          {token !== undefined && <Nav.Link href="/ask-ai">Ask AI</Nav.Link> //add this to each navbar item that should only appear while signed in
          }
        </Nav>

        <Nav className="justify-content-end">
          {token === undefined && (
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={Nav.Link}>Register</Dropdown.Toggle>
              <Dropdown.Menu alignRight={true}>
                <Dropdown.Item href="/profile">General Public</Dropdown.Item>
                <Dropdown.Item href="/dashboard">
                  Researcher/Grower
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {token === undefined && <Nav.Link href="/login">Login</Nav.Link>}
          {token !== undefined && (
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={Nav.Link}>{name}</Dropdown.Toggle>
              <Dropdown.Menu alignRight={true}>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Navbar>
      <Routes />
    </div>
  );
}
