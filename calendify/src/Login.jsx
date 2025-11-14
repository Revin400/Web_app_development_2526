import "./login.css";
import calendifylogo from "./calendifylogo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        setError(err?.message || "Onbekende fout");
        return;
      }

      const data = await res.json();
      navigate("/calendar");
    } catch (err) {
      console.error(err);
      setError("Kan geen verbinding maken met de server.");
    }
  };

  return (
    <div className="body">
      <div className="logo-container">
        <img src={calendifylogo} alt="Calendify Logo" className="logo-image" />
        <span className="logo-text">Calendify</span>
      </div>

      <div className="login-container">
        <form className="login" onSubmit={handleLogin}>
          <div className="employeenumber">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="text"
              name="employeenumber"
              id="employeenumber"
              placeholder="Enter your employee number"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="loginbutton">
<<<<<<< Updated upstream:calendify/src/Login.jsx
            <button class="loginbutton" onClick={() => navigate("/calendar")}>Log In</button>
=======
            <button type="submit" className="loginbutton">
              Log In
            </button>
>>>>>>> Stashed changes:calendify/src/Login.tsx
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
