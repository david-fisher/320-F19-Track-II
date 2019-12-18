import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Row,
  Col
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Register.css";
import "react-datepicker/dist/react-datepicker.css";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import Cookies from "universal-cookie";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [modalShow, setModalShow] = React.useState(false);

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      birthday
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(
      "https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/register-user",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Email: email,
          Role: "PUBLIC",
          FirstName: firstName,
          LastName: lastName,
          Password: password
        })
      }
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(json => {
        console.log(json);
        setModalShow(true);
      })
      .catch(error => {
        alert("Credentials exist in system, please try again.");
      });
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <div className="" style={{ marginTop: "60px" }}>
          <form onSubmit={handleSubmit}>
            <Row>
              <FormGroup as={Col} controlId="firstName">
                <FormLabel>First Name</FormLabel>
                <FormControl
                  autoFocus
                  type="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </FormGroup>
              <FormGroup as={Col} controlId="lastName">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  type="lastName"
                  placeholder="Applescab"
                />
              </FormGroup>
            </Row>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@orchardwatch.com"
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
            <Row>
              <FormGroup as={Col} controlId="country">
                <FormLabel>Country</FormLabel>

                <Form.Control
                  as="select"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  type="country"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </Form.Control>
              </FormGroup>
            </Row>
            <Row>
              <Col>
                <FormGroup controlId="birthday">
                  <FormLabel>Birthday</FormLabel>
                  <Row>
                    <Col>
                      <DatePicker
                        selected={birthday}
                        onChange={date => setBirthday(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup controlId="authCode">
              <FormLabel>Auth Code (optional)</FormLabel>

              <FormControl
                value={authCode}
                onChange={e => setAuthCode(e.target.value)}
                type="authCode"
                placeholder="For researchers and growers"
              />
            </FormGroup>

            <Button block disabled={!validateForm()} type="submit">
              Create account
            </Button>
          </form>
        </div>
      </Col>
      <SuccessModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          window.location.reload();
        }}
      />
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
