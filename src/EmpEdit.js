import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                idchange(resp.id);
                namechange(resp.name);
                emailchange(resp.email);
                contactschange(resp.contacts);
                positionchange(resp.position);
                activechange(resp.isactive);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [empid]); // Add empid to the dependency array

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [surname, surnamechange] = useState("");
    const [email, emailchange] = useState("");
    const [contacts, contactschange] = useState("");
    const [position, positionchange] = useState("");
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, name, surname, email, contacts, position, active };

        fetch("http://localhost:8000/employee/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata),
        })
            .then((res) => {
                alert('Saved successfully.');
                navigate('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
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
                                                onMouseDown={(e) => valchange(true)}
                                                onChange={(e) => namechange(e.target.value)}
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
                                                onMouseDown={(e) => valchange(true)}
                                                onChange={(e) => surnamechange(e.target.value)}
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
                                            <input value={email} onChange={(e) => emailchange(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Contacts</label>
                                            <input value={contacts} onChange={(e) => contactschange(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Position</label>
                                            <input value={position} onChange={(e) => positionchange(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input
                                                checked={active}
                                                onChange={(e) => activechange(e.target.checked)}
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

export default EmpEdit;
