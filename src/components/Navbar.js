import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let history = useHistory();

  const handleLogout = ()=> {
    localStorage.removeItem("token");
    history.push("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("token") ? (
            <button
              className="btn btn-sm btn-danger mx-1" onClick={handleLogout}
            >
              LogOut
            </button>
          ) : (
            <form>
              <Link
                className="btn btn-sm btn-warning mx-1"
                to="/login"
                role="button"
              >
                LogIn
              </Link>
              <Link
                className="btn btn-sm btn-warning mx-1"
                to="/signup"
                role="button"
              >
                SignUp
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
