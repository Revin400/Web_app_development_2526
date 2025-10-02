import React from "react";
import './WelcomeScreen.css';
import MainLogo from './Logo_Calendify.png';

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">

      {/* <img src={MainLogo} alt="Calendify Logo" className="logo" /> */}
      <img src={MainLogo} alt="Calendify Logo" className="logo" />


      
      <h1 className="logo-text">Calendify</h1>

      <h1>Welcome to Calendify!</h1>
      <p>Your personal calendar assistant.
                
      </p>

      <div className="button">
        <button className="button" onClick={() => alert("Get Started Clicked!")}>Log In</button>
      </div>  
        <footer>

            <p>&copy; 2025 Calendify. All rights reserved.</p>
            
        </footer>
    </div>
  );
};
export default WelcomeScreen;