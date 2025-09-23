import { useEffect, useState } from "react";
import "./login.css";
import calendifylogo from "./calendifylogo.png";
export default function LoginPage() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    function updateTimestamp() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTimestamp(`${day}-${month}-${year} ${hours}:${minutes}`);
    }

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="body">
      <div className="header-container">
        <div>{timestamp}</div>
      </div>

      <div className="logo-container">
<img src={calendifylogo} alt="Calendify Logo" className="logo-image" />
        <span className="logo-text">Calendify</span>
      </div>

      <div className="login-container">
        <form className="login">
          <div className="employeenumber">
            <input
              type="text"
              name="employeenumber"
              id="employeenumber"
              required
              placeholder="Enter your employee number"
            />
          </div>

          <div className="password">
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="loginbutton">
            <input type="button" value="login" />
          </div>
        </form>
      </div>
    </div>
  );
}
