import React from "react";
import "./About.css";
import { SocialIcon } from "react-social-icons";
import { Container, Row } from "react-bootstrap";
import { Timeline } from "react-twitter-widgets";

export function About() {
  return (
    <div>
      <Container className="Title">
        <h1>About Us</h1>
        <hr />
      </Container>
      <Container>
        <img src={require("./orchard.jpg")} alt="Orchard" class="center" />
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar
          pharetra felis, id faucibus magna. Donec iaculis sagittis leo, at
          dictum metus volutpat eget. Praesent iaculis sit amet mauris ut
          euismod. Aliquam pulvinar consequat facilisis. Cras quis laoreet leo.
          Cras porttitor iaculis posuere. Maecenas pulvinar, risus non eleifend
          congue, mauris urna euismod nibh, at venenatis dolor diam id lectus.
          Ut ut congue mauris. Sed rhoncus commodo velit, a consectetur metus.
          Morbi justo tortor, aliquet non mi nec, tincidunt condimentum augue.
          Suspendisse elementum feugiat scelerisque. Integer cursus eros in eros
          facilisis, id pharetra eros ultrices. Donec aliquet risus eu aliquam
          elementum.
        </p>
      </Container>
      <Container className="scroll">
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "TweetingToaster"
          }}
        />
      </Container>
      <Container className="margin-bottom">
        <h2>Follow us on social media:</h2>
        <Row className="SocialIcons">
          <SocialIcon url="http://facebook.com" />
          <SocialIcon url="http://instagram.com" />
          <SocialIcon url="http://twitter.com" />
        </Row>
      </Container>
    </div>
  );
}

export default About;
