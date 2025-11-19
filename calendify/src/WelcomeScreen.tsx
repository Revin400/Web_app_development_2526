import React from "react";
import "./WelcomeScreen.css";
import MainLogo from "./Logo_Calendify.png";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-screen">

      <img src={MainLogo} alt="Calendify Logo" className="welcome-logo" />

      <h1 className="welcome-title">Calendify</h1>

      <p className="welcome-subtitle">
        Your time, organized. Easily manage events, reminders and more.
      </p>

      <div className="welcome-buttons">
        <button className="ws-btn" onClick={() => navigate("/login")}>
          Log In
        </button>

        <button className="ws-btn secondary" onClick={() => navigate("/registration")}>
          Register
        </button>
      </div>

      <footer className="welcome-footer">
        <p>© 2025 Calendify</p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
