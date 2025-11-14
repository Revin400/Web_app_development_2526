import "./login.css";
import calendifylogo from "./calendifylogo.png";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="body">


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
            <button className="loginbutton" onClick={() => navigate("/calendar")}>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default LoginPage;
