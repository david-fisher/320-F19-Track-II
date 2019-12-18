import React from "react";
import Cookies from "universal-cookie";
import { Container, Card, Col } from "react-bootstrap";
//import "./Profile.css";

export default function Profile() {
  const cookies = new Cookies();
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");
  const email = cookies.get("email");
  const role = cookies.get("role");

  return (
    <div className="page">
      <Container className="Title">
        <h1>Your Profile {cookies.get("name")}</h1>
        <hr className="titleHR" />
      </Container>
      <Container>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <hr />
              <Card.Text className="row-css">First Name</Card.Text>
              <p>{firstName}</p>
              <hr />
              <Card.Text className="row-css">Last Name</Card.Text>
              <p>{lastName}</p>
              <hr />
              <Card.Text>Password</Card.Text>
              <p>*****************</p>
              <a href="/home">Change your password</a>
              <hr />
              <Card.Text>Email</Card.Text>
              <p>{email}</p>
              <hr />
              <Card.Text>Birthday</Card.Text>
              <p>03/26/99</p>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
}
