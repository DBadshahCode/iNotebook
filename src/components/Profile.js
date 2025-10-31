import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // For demo – you can later fetch actual user data from backend
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  useEffect(() => {
    // Example: you could load user details from API here using token
    // fetchUserProfile();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditToggle = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here (e.g. update API)
    setIsEditing(false);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="card-body p-4">
          <h3 className="card-title mb-4 text-center fw-bold text-success">
            Profile Settings
          </h3>

          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Name
              </label>
              <input
                type="text"
                className="form-control rounded-3"
                id="name"
                name="name"
                value={user.name}
                readOnly={!isEditing}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email address
              </label>
              <input
                type="email"
                className="form-control rounded-3"
                id="email"
                name="email"
                value={user.email}
                readOnly={!isEditing}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <div id="emailHelp" className="form-text">
                We’ll never share your email with anyone else.
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4">
              {isEditing ? (
                <button type="submit" className="btn btn-success px-4">
                  Save
                </button>
              ) : (
                <button className="btn btn-primary px-4" onClick={handleEditToggle}>
                  Edit
                </button>
              )}
              <button className="btn btn-danger px-4" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
