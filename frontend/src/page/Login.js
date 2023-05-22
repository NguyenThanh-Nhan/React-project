import Header from "../container/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, [navigate]);

  async function login() {
    console.warn(email, password);
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(item),
    });
    setSuccessMessage("login unsuccessful!");
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/home");
  }

  return (
    <>
      <Header />

      <div className="container h-100 mt-5">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-dark">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="bi-grid-3x3-gap-fill" /> Login
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                    
                
                <input
                  type="text"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                <br/>
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                <br/>
                <div className="row">
                  <div className="offset-sm-3 col-auto">
                    <button onClick={login} className="btn btn-primary">
                      Login
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

export default Login;
