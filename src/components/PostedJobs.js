import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Pagination from "./Pagination";
import "../css/PostedJobs.css";
import JobCard from "./JobCard";
import home from "../assests/home.png"
import myJobs from '../assests/myJobs.PNG';

function PostedJobs() {
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (location.state !== null) {
    var authTokenOfRecruiter = location.state.authToken;
  }
  //const authTokenOfRecruiter = location.state.authToken;

  console.log(authTokenOfRecruiter, "in posted jobs ");

  const [jobs, setJobs] = useState([]);
  const { id } = useParams();

  const [displayPerPage, setDisplayPerPage] = useState(12);
  const [pagination, setPagination] = useState({
    start: 0,
    end: displayPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    if (authTokenOfRecruiter !== "") {
      getJobs();
    }
  }, []);

  const getJobs = async () => {
    let result = await fetch(
      "https://jobs-api.squareboat.info/api/v1/recruiters/jobs",
      {
        headers: {
          authorization: authTokenOfRecruiter,
        },
      }
    );
    result = await result.json();
    console.log(result, "All the jobe belonging to this recruiter");
    setJobs(result.data.data);
  };

  const openApplicants = () => {
    setShow(true);
  };

  const logOut = () => {
    navigate("/",{state: {message: "loggedout"}});
  };

  if (authTokenOfRecruiter === undefined) {
    navigate("/noaccess");
  }

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
              <Button variant="outline-light" onClick={logOut}>
                Logout{" "}
              </Button>{" "}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      
      <div>
      <div className="home"><img src={home} alt="home"/> <a href='/'>Home</a> </div>
      <div className="posted-jobs">
      <h1>Jobs Posted by you </h1>
      </div>
       
        
      </div>

      <div className="hero-bottom">
        <div className="container py-4">
          <div className="row">
            {jobs.slice(pagination.start, pagination.end).map((job) => (
              <div className="col-md-3 mb-3" key={job.id}>
                <JobCard job={job} token={authTokenOfRecruiter} />
              </div>
            ))}
          </div>

          <Pagination
            displayPerPage={displayPerPage}
            onPaginationChange={onPaginationChange}
            total={jobs.length}
          />
        </div>
      </div>
      <div className="model">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Applicants for this Job</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>

          <div className="model-login-btn">
            <Button variant="primary">Login</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default PostedJobs;
