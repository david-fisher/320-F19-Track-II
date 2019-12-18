import React from "react";
import Cookies from "universal-cookie";
import {Container, Card, Button, Col,Row} from "react-bootstrap";
import "./Profile.css";

export default function Profile() {
    const cookies = new Cookies();
    return (
        <div className = "page">
            <Container className="Title">
                <h1>Welcome {cookies.get('name')}</h1>
                <hr className = "titleHR"/>
            </Container>
            <Container>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title >
                                Profile Information
                            </Card.Title>
                            <hr/>
                            <Card.Text className = "row-css">Name</Card.Text>
                            <p>My Name Is Kyle</p>
                            <hr/>
                            <Card.Text>Password</Card.Text>
                            <p>*****************</p>
                            <hr/>
                            <Card.Text>Email</Card.Text>
                            <p>IEatTurd@turd.com</p>
                            <hr/>
                            <Card.Text>Location</Card.Text>
                            <p>Mobile, Alabama</p>
                            <hr/>
                            <Card.Text>Birthday</Card.Text>
                            <p>06/09/69</p>
                            <hr/>
                            <Card.Text>About Me</Card.Text>
                            <p>Hi my name is kyle and i like to eat turds</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        </div>
    );
}
/*
            <h3>Name: {cookies.get('name')}</h3>
            <h3>Name: {cookies.get('name')}</h3>
            <h3>Name: {cookies.get('name')}</h3>
            <h3>Name: {cookies.get('name')}</h3>
            <h3>Name: {cookies.get('name')}</h3>
            */
/*
First Name
Last Name
Birthdate
Email
State
Country
Username
Password
*/