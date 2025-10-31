import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute"

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />

          <div className="container">
            <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home showAlert={showAlert} />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login showAlert={showAlert} />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup showAlert={showAlert} />
              </PublicRoute>
            }
          />

          {/* fallback route if you want */}
          <Route path="*" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
          </div>
          <Alert alert={alert} />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
