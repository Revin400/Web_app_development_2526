import "./login.css";
import calendifylogo from "./calendifylogo.png";
export default function LoginPage() {


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
            <input type="button" value="login" />
          </div>
        </form>
      </div>
    </div>
  );
}
