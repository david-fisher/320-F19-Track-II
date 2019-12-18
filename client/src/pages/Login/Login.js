import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Cookies from "universal-cookie";
import LoginModal from "../../components/LoginModal/LoginModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(
      "https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/user-login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Email: email,
          Password: password
        })
      }
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error("Server can't be reached!");
        }
      })
      .then(json => {
        console.log("hooray! we have json!");
        console.log(json);
        const cookies = new Cookies();
        cookies.remove("email");
        cookies.remove("firstName");
        cookies.remove("lastName");
        cookies.remove("role");
        cookies.remove("token");
        cookies.set("email", json["body"]["userinfo"]["EMail"], {
          path: "/"
        });
        cookies.set("firstName", json["body"]["userinfo"]["FName"], {
          path: "/"
        });
        cookies.set("lastName", json["body"]["userinfo"]["LName"], {
          path: "/"
        });
        cookies.set("role", json["body"]["userinfo"]["Role"], { path: "/" });
        cookies.set("token", json["body"]["token"], { path: "/" });
      })
      .then(() => {
        setModalShow(true);
      })
      .catch(error => {
        alert("Invalid credentials");
        console.log(error);
      });
  }

  return (
    <div>
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
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
          <FormGroup>
            <Button block disabled={!validateForm()} type="submit">
              Login
            </Button>
          </FormGroup>
          <FormGroup>
            <Button block href="/register">
              Create an account
            </Button>
          </FormGroup>
          <LoginModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              window.location.reload();
            }}
          />
        </form>
      </div>
    </div>
  );
}
