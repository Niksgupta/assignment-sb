import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/PostedJobs.css";

import curriculum from "../assests/curriculum.png";

function Applicants(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  console.log(props, "In applicants");
  const totalApplicants = props.applicants.length;

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Modal
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Applicants for this Job
        </Modal.Title>
      </Modal.Header>

      <div>
        <p>Total {totalApplicants} Applicants</p>
      </div>
      {totalApplicants === 0 ? (
        <>
          <img src={curriculum} alt="curriculum" border="0" />
          No Applications Available!
        </>
      ) : (
        <Row xs={1} md={2} className="applicants">
          {props.applicants.map((applicant) => (
            <Col>
              <Card key={applicant.id}>
                <Card.Body>
                  <div className="name-email">
                    <p className="circle">
                      <span class="text">{applicant.name.slice(0, 1)}</span>{" "}
                    </p>
                    <h3 className="name">
                      <b>{applicant.name}</b>
                    </h3>
                  </div>
                  <div className="email">{applicant.email}</div>

                  <div className="skills">
                    <h5>Skills:</h5>{" "}
                  </div>
                  <div className="skills">{applicant.skills}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Modal>
  );
}

export default Applicants;
