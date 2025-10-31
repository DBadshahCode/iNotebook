import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      props.showAlert(json.error || "Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "380px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-success">iNotebook</h3>
          <p className="text-muted mb-0">Login to your account</p>
        </div>

        <form onSubmit={handleLogIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              required
              className="form-control form-control-lg"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              required
              className="form-control form-control-lg"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-success btn-lg w-100">
            Log In
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-success fw-semibold text-decoration-none"
            >
              Sign Up
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
