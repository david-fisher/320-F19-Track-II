import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";
import "./Register.css";
import Cookies from "universal-cookie";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (password === "admin") {
      const cookies = new Cookies();
      cookies.set("name", "David", { path: "/" });
      cookies.set("token", "test_token_value", { path: "/" });
      alert("Logged in");
      window.location.reload();
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <Row>
      
      <Col md={{ span: 6, offset:3 }}>
    <div className="" style={{marginTop: '60px'}}>
      <form onSubmit={handleSubmit}>
        <Row>
          <FormGroup as={Col} controlId="firstName">
            <FormLabel>First Name</FormLabel>
            <FormControl
              autoFocus
              type="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup as={Col} controlId="lastName">
            <FormLabel>Last Name</FormLabel>
            <FormControl
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              type="lastName"
            />
          </FormGroup>
        </Row>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup as="select" controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            value={country}
            onChange={e => setCountry(e.target.value)}
            type="country"
          />
          <option>Choose...</option>
        <option>America</option>
        <option>United States</option>
        <option>USA</option>
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Create account
        </Button>
      </form>
    </div>
    </Col>
    
    </Row>
  );
}

/*First Name: Bobby
Last Name: Tables
Birthdate: 1/1/1970
Email: orchardwatchtest1@gmail.com
State: MA
Country: US
Username: droptable
Password: hunter2.
*/