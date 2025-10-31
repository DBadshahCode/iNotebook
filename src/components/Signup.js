import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "warning");
      return;
    }

    try {
      const response = await fetch(`/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Signup Successful!", "success");
        navigate("/");
      } else {
        props.showAlert(json.error || "Signup Failed", "danger");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      props.showAlert("Server error, please try again later", "danger");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow border-0 p-4 rounded-4">
        <h2 className="text-center mb-4 text-success fw-bold">
          Create Your Account
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-3"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              value={credentials.name}
              onChange={onChange}
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={credentials.email}
              onChange={onChange}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={5}
              value={credentials.password}
              onChange={onChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control rounded-3"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm password"
              required
              minLength={5}
              value={credentials.cpassword}
              onChange={onChange}
            />
            <label htmlFor="cpassword">Confirm Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-3 py-2 fw-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
