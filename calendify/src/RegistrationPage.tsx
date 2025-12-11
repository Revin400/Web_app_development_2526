import "./RegistrationPage.css";
import calendifylogo from "./calendifylogo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        setError(err?.message || "Unknown error occurred.");
        return;
      }

      const data = await res.json();
      navigate("/calendar");
    } catch (err) {
      console.error(err);
      setError("Cannot connect to the server.");
    }
  };

 return (
    <div className="body">
      <div className="logo-container">
        <img src={calendifylogo} alt="Calendify Logo" className="logo-image" />
        <span className="logo-text">Calendify</span>
      </div>

      <div className="Registration-form-container">
        <form className="Registration-form" onSubmit={handleRegistration}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />       
          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="registration-button">
            Register
          </button>

          <p
            className="redirect-text"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Already have an account? Log in here.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;