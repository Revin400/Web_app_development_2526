import "./Settingspage.css";
import { useNavigate } from "react-router-dom";
import personal_foto from './Ellipse 4.png';

const SettingsPage = () => {
  // Import useNavigate from react-router-dom
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <a onClick={() => navigate("/settings")}>My Settings</a>
        <a onClick={() => navigate("/calendar")}>My Reminders</a>
        <a onClick={() => navigate("#")}>Appearance</a>
        <a onClick={() => navigate("/new-Reminders")}>New Reminders</a>
        <a onClick={() => navigate("/")}>Log Out</a>
      </div>

      <div className="settings-content">
            <div className="picture">
            <img src={personal_foto} alt="Calendify Logo" className="logo" />
            </div>


        <div className="settings-block">
          <div className="settings-upper-section">
            <h4 className="settings-neweventpill">Settings</h4>
          </div>
          <div className="settings-content-section">
            <div className="settings-left-section">
              <div className="settings-left-content">
                <div className="settings-left-item">
                  <h3>Account</h3>
                  <p>Change your account settings and set preferences</p>
                
              </div>
                <div className="settings-left-item">
                    <h3>Notifications</h3>
                    <p>Manage your notification settings</p>
                </div>
            </div>
            </div>
            <div className="settings-right-section">
              <div className="settings-right-content">
                <h3>Account Settings</h3>
                
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
