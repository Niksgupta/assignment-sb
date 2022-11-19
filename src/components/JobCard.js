import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Applicants from "./Applicants";

import "../css/PostedJobs.css";
import locationImage from "../assests/locationImage.png";

function JobCard(props) {
  const ref = useRef(null);
  const [jobId, setJobId] = useState("");
  const [applicants, setApplicants] = useState([]);

  const authTokenOfRecruiter = props.token;

  console.log(authTokenOfRecruiter, "Token in job card");
  console.log(props.job.location, "length");
  if (props.job.location.length > 8) {
    props.job.location.slice(0, 4);
  }

  const viewApplicant = (e) => {
    console.log(ref.current.id);
    setJobId(ref.current.id);
  };

  useEffect(() => {
    const getApplicants = async () => {
      console.log("Do I come here");
      let result = await fetch(
        `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${jobId}/candidates`,
        {
          headers: {
            authorization: authTokenOfRecruiter,
          },
        }
      );
      result = await result.json();
      console.log(result, "Applicants to this Job");
      //setJobs(result.data.data);
      setApplicants(result.data);
    };

    if (jobId !== "") {
      getApplicants();
    }
  }, [jobId, authTokenOfRecruiter]);

  console.log(applicants, "received?");
  return (
    <div className="card">
      <div className="card-body">
        <div className="job-title">
          <h5>{props.job.title}</h5>
        </div>

        <div className="job-desc">
          <p>{props.job.description}</p>
        </div>

        <div className="parent">
          <div className="child">
            <div className="childinner">
              {" "}
              <img
                src={locationImage}
                alt="Icon-material-location-on-1-2x"
                border="0"
              />
            </div>
          </div>
          <div className="child">
            <div className="childinner"> {props.job.location.slice(0, 6)}</div>
          </div>
          <div className="child">
            <div className="childinner">
              <Button ref={ref} id={props.job.id} onClick={viewApplicant}>
                View Applicants
              </Button>
            </div>
          </div>
        </div>

        {applicants.map((applicant) => (
          <div className="col-md-3 mb-3" key={applicant.id}>
            <Applicants
              applicants={applicants}
              token={authTokenOfRecruiter}
              show={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobCard;
