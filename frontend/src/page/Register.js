import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../container/Header";

function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/home");
    }
  }, [navigate]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function signUp() {
    let item = { name, password, email };
    console.warn(item);

    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (result.ok) {
      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      setSuccessMessage("Sign Up Success!");
      setErrorMessage("");
    } else {
      setErrorMessage("Sign Up Failed! Please try again.");
      setSuccessMessage("");
    }
  }
  return (
    <>
      <Header />
      <div className="container h-100 mt-5">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-dark">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">Login</h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="name"
                />
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="password"
                />
                <br />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="email"
                />
                <br />
                <div className="row">
                  <div className="offset-sm-3 col-auto">
                    <button onClick={signUp} className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
