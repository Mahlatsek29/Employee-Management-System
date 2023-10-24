import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpCreate = () => {
  const [id] = useState(""); // ID should not be editable by the user
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState("");
  const [position, setPosition] = useState("");
  const [active, setActive] = useState(true);
  const [validation, setValidation] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are empty
    if (!name || !surname || !position) {
      setValidation(true);
    } else {
      setValidation(false);

      const empdata = { id, name, surname, email, contacts, position, active };

      fetch("http://localhost:8000/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Fixed content-type header
        body: JSON.stringify(empdata),
      })
        .then((res) => {
          if (res.status === 201) { // Check for a successful status code
            alert("Saved successfully.");
            navigate("/");
          } else {
            alert("Failed to save data. Please check your input.");
          }
        })
        .catch((err) => {
          console.log(err.message);
          alert("An error occurred while saving data.");
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Create Employee</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled={true} className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                      />
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Surname</label>
                      <input
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="form-control"
                      />
                      {surname.length === 0 && validation && (
                        <span className="text-danger">Enter the surname</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Contact</label>
                      <input
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Position</label>
                      <input
                        required
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="form-control"
                      />
                      {position.length === 0 && validation && (
                        <span className="text-danger">Enter the Position</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;
