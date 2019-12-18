import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== "password") {
      alert("Invalid password");
    } else {
      fetch(
        "https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/user-login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Email: "test@test.com",
            Password: "password"
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
          cookies.set("name", "David", { path: "/" });
          cookies.set("token", "test_token_value", { path: "/" });
          alert("Logged in");
          window.location.reload();
        })
        .catch(error => {
          alert("Invalid credentials");
        });
    }
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
          <Button block disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
      <div className="Register">
        <Button href="/register">Create an account</Button>
      </div>
    </div>
  );
}
