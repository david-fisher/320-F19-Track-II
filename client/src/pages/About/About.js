import React from "react";
import "./About.css";
import { SocialIcon } from "react-social-icons";
import { Container, Col, Row } from "react-bootstrap";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container className="Title">
          <h1>About us</h1>
          <hr></hr>
        </Container>

        <Container>
          <h2>Follow us on social media:</h2>
          <Row>
            <SocialIcon url="http://facebook.com" />
            <SocialIcon url="http://instagram.com" />
            <SocialIcon url="http://twitter.com" />
          </Row>
        </Container>
      </div>
    );
  }
}

export default About;
