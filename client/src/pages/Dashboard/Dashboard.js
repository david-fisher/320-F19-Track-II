import React from "react";
import "./Dashboard.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container className="Title">
          <h1>Research Dashboard</h1>
          <hr></hr>
        </Container>
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Data</Card.Title>
                  <Card.Text>
                    View research data in a table, ready to download
                  </Card.Text>
                  <Button variant="primary">Take me there</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Announcemenets</Card.Title>
                  <Card.Text>
                    View past announcements or make a new one.
                  </Card.Text>
                  <Button variant="primary">Take me there</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Upload Images</Card.Title>
                  <Card.Text>
                    Upload images to help machine learning models.
                  </Card.Text>
                  <Button variant="primary">Take me there</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
