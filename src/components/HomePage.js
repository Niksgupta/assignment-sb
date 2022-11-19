import React, { useEffect,useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

import myJobs from '../assests/myJobs.PNG';
import homeImage from '../assests/homeImage.png';
import companies from '../assests/companies.PNG';

import Button from "react-bootstrap/Button";

import "../css/Home.css";


function HomePage() {

  const navigate = useNavigate();

  const location = useLocation();

 console.log(location.state)

  if (location.state !== null) {
    var loggedOutMessage = location.state.message;
  }
  const[isLoggedOut, setIsLoggedOut] = useState(false);


  useEffect(()=>{
    if(loggedOutMessage ==="loggedout"){
        setIsLoggedOut(true);
    }

  },[loggedOutMessage])

  return (
    <div>
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand variant="light" href="#home">
              <a href="#home">
                <img
                  src={myJobs}
                  alt="myJobs"
                  border="0"
                ></img>
                
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Button
                variant="outline-light"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>{" "}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="main-hero">
        <div className="text-and-image">
          <div>
            <h1 className="welcome-note">Welcome to</h1>
            <h1 className="welcome-note">
              My<span style={{ color: "#43AFFF" }}>Jobs</span>
            </h1>
            <div className="get-started-btn">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </div>
          </div>

          <h3 className="image">
            <img
              src={homeImage}
              alt="homeImage"
              border="0"
            />
          </h3>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="second-hero"></div>

        <div class="container">
          <div className="why-us"></div>
          <h1>Why Us</h1>
        </div>
        <div>
          <p></p>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-4">
              <div class="card">
                <div className="card-header">
                  <h3>Get More Visibility</h3>
                </div>

                <h6 className="card-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </h6>
              </div>
            </div>
            <div class="col-4">
              <div class="card">
                <div className="card-header">
                  <h3>Organize Your Candidates</h3>
                </div>

                <h6 className="card-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h6>
              </div>
            </div>
            <div class="col-4">
              <div class="card">
                <div className="card-header">
                  <h3>Verify Their Abilities</h3>
                </div>

                <h6 className="card-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </h6>
              </div>
            </div>
          </div>
        </div>

<div className="third-hero">
<div class="container">
          <div className="why-us"></div>
          <h1>Companies Who Trust Us</h1>
        </div>


        <div class="container">
          <div className="companies-image">
          <img src={companies} alt="compaines" border="0"/>
          </div>
        </div>
        
</div>
       
      </div>
    </div>
  );
}

export default HomePage;
