import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div>
      <div className="container my-5">
        <h2>Profile Setting</h2>
        <form name="signUpForm">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" readOnly={ true } />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              readOnly={ true }
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
            />
          </div> */}
          <button type="submit" className="btn btn-warning mx-1">
            Save
          </button>
          <button className="btn btn-danger mx-1" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn btn-primary mx-1">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
