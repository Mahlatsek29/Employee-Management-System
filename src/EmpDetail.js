import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();

  const [empdata, setEmpData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => res.json())
      .then((resp) => {
        setEmpData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  return (
    <div>
      <div className="container">
        <div className="card" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Employee Details</h2>
          </div>
          <div className="card-body">
            {empdata && (
              <div>
                <h2>
                  The Employee name is : <b>{empdata.name}</b> ({empdata.id})
                </h2>
                <h3>Contact Details</h3>
                <h5>Email is : {empdata.email}</h5>
                <h5>Contacts is : {empdata.contacts}</h5>
                <Link className="btn btn-danger" to="/">
                  Back to Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDetail;
