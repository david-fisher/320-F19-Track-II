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
  
          <h1 className = "header ">Our Mission</h1>
          <p class="lead border border-light rounded" >
          Here at OrchardWatch, we are working to help farmers be more efficient with production 
          and management on their farms while also bringing knowledge about where our food comes 
          from into the public eye. Today there are over 820 million people suffering from hungering 
          around the world. With the global population set to surpass 9 billion by the year 2050, our food 
          production will need to more than double. This increased demand for food production, 
          combined with the growing threat of climate change affecting our crops, means that farms 
          will need to use their land more efficiently in order to put an end to world hunger. By 
          using networks of sensors and advanced models, we can provide meaningful and precise data 
          to help farmers better visualize conditions on their farms, receive alerts when plants are 
          at risk, and predict when the best time to fertilize, water, and harvest will be. We also give 
          farmers the tools they need to identify pests and diseases that may hurt their crops by using 
          artificial intelligence to analyze images and identify possible threats. It is our hope that by 
          raising awareness and improving the efficiency of farms we can create a better future without mass hunger.
          </p>
      </Container>
      <Container className = "timeline">
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "BarackObama"
          }}
          options={{
            height:'600'
          }}
        />
      </Container>
      <footer class="page-footer font-small bg-dark footer text-justify">
        Follow Our Social Media    
        <SocialIcon className = "left-margin" url="http://facebook.com" />
        <SocialIcon url="http://instagram.com" />
        <SocialIcon url="http://twitter.com" />
      </footer>
    </div>
    
  );
}



export default About;
