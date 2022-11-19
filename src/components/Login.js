import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import "../css/Login.css";

import myJobs from "../assests/myJobs.PNG";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userCredentials, setUSerCredetials] = useState({
    email: "",
    password: "",
  });

  const [invalidEmail, setInvalidEmail] = useState(false);

  const [error, setError] = useState(null);

  const [authToken, setAuthToken] = useState("");

  //checking for email validation

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmail = (event) => {
    console.log(event.target.value, "Email");
    if (!isValidEmail(event.target.value)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(null);
    }

    setUSerCredetials({ ...userCredentials, email: event.target.value });
  };

  const handlePassword = (event) => {
    // if (!isValidEmail(event.target.value)) {
    //   setInvalidEmail('Email is invalidEmail');
    // } else {
    //   setInvalidEmail(null);
    // }
    console.log(event.target.value, "password");
    setUSerCredetials({ ...userCredentials, password: event.target.value });
  };

  const loginCall = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    };
    fetch("https://jobs-api.squareboat.info/api/v1/auth/login", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        setAuthToken(data.data.token);
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          console.log(error, "err");
          setError(data.message);
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  console.log(authToken, "Receeived toek?   ");
  return (
    <div>
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand variant="light" href="#home">
              <a href="#home">
                <img src={myJobs} alt="myJobs" border="0"></img>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Button variant="outline-light" onClick={handleShow}>
                Login
              </Button>{" "}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div>
        <div className="hero-container">
          <div className="item">
            {/* <div className="text">Welcome to MyJobs</div> */} 1
          </div>
          <div className="item">2</div>
        </div>
      </div>
      <div className="hero-bottom"></div>
      <div className="model">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                {invalidEmail ? (
                  <>
                    <Form.Control
                      type="email"
                      placeholder="Enter your Email"
                      onChange={handleEmail}
                      value={userCredentials.email}
                    />
                    <p className="invalid-email">
                      Please enter a valid Email Address
                    </p>
                  </>
                ) : (
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    onChange={handleEmail}
                    value={userCredentials.email}
                  />
                )}

                {/* <Form.Control
                type="email"
                placeholder="Enter your Email"
                onChange={handleEmail}
                value={userCredentials.email}
              /> */}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                  onChange={handlePassword}
                  value={userCredentials.password}
                />
                {error !== null && <p className="invalid-email">{error}</p>}
              </Form.Group>
            </Form>
          </Modal.Body>

          <div className="model-login-btn">
            <Button variant="primary" onClick={loginCall}>
              Login
            </Button>
          </div>
        </Modal>
      </div>

      {authToken !== "" &&
        navigate("/postedjobs", { state: { authToken: authToken } })}
    </div>
  );
}

export default Login;
