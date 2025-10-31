import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Update token when navigation changes (after login/logout)
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container-fluid px-4">
        <Link
          className="navbar-brand fw-bold text-success fs-4"
          to="/"
        >
          <i className="bi bi-journal-text me-1"></i> iNotebook
        </Link>

        {/* Navbar toggle for mobile view */}
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

        {/* Navbar menu */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left section */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active text-success fw-semibold" : ""
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/profile"
                        ? "active text-success fw-semibold"
                        : ""
                    }`}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right section */}
          <div className="d-flex">
            {!token ? (
              <>
                <Link className="btn btn-outline-success mx-1" to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>
                <Link className="btn btn-success mx-1" to="/signup">
                  <i className="bi bi-person-plus me-1"></i> Signup
                </Link>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
