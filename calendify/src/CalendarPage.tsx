import "./CalendarPage.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calendifylogo from "./calendifylogo.png";
import Profilepic from "./Default_pfp.png";
import checkmark from "./check-img.png";
import {useSession} from "./hooks/useSession";


const CalendarPage = () => {
  const [activeCard, setActiveCard] = React.useState(null);
  const [activeSegment, setActiveSegment] = React.useState("events");
  const navigate = useNavigate();
  const {role, loading, isLoggedIn , name} = useSession();
  
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
    }
  } , [isLoggedIn, navigate]);

  const eventsDays = [
    { day: 1, weekday: "MON" },
    { day: 7, weekday: "SUN" },
    { day: 24, weekday: "FRI" },
    { day: 25, weekday: "SAT" },
  ];
  
  const remindersDays = [
    { day: 3, weekday: "WED" },
    { day: 10, weekday: "WED" },
    { day: 15, weekday: "MON" },
    { day: 28, weekday: "SUN" },
  ];
  
if (loading) {
  return (
    <div className="loading-screen">
      <div className="logo-container">
        <img src={calendifylogo} alt="Calendify Logo" className="logo-image" />
        <span className="logo-text">Calendify</span>
        <div className="loading-text">
          Welcome {name}! Please hang tight while we load your information…
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="page">
      <section className="content">
        <div className="segment-row">
          <div className="segment" role="tablist" aria-label="View type">
            <button
              type="button"
              role="tab"
              aria-selected={activeSegment === "events"}
              className={`seg-btn ${activeSegment === "events" ? "is-active" : ""
                }`}
              onClick={() => setActiveSegment("events")}
            >
              events
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSegment === "reminders"}
              className={`seg-btn ${activeSegment === "reminders" ? "is-active" : ""
                }`}
              onClick={() => setActiveSegment("reminders")}
            >
              reminders
            </button>
          </div>

          <div className="profile-container">
            <img src={Profilepic} alt="User profile" className="profile-pic" />

            <div className="profile-dropdown">
              <button>Profile</button>
              <button>My Account</button>
              <button onClick={() => navigate("/settings")}>Settings</button>
              <button onClick={() => {
                fetch("http://localhost:5000/api/auth/logout", {
                  method: "POST",
                  credentials: "include",
                }).then(() => {
                  navigate("/login");
                });
              }}>Logout</button>
            </div>
          </div>
          {role === "Admin" && (
          <button
            className="add-event-btn"
            onClick={() =>
              navigate(
                activeSegment === "reminders" ? "/new-reminder" : "/new-event"
              )
            }
          >
            {activeSegment === "reminders" && "+ Add Reminder"}
            {activeSegment === "events" && "+ Add Event"}
          </button>
        )}
        </div> 
        <div className="cards">
          {activeSegment === "events" &&
            eventsDays.map(({ day, weekday }) => (
              <button
                key={day}
                className={`card card-btn${activeCard === day ? " is-active" : ""
                  }`}
                onClick={() => setActiveCard(day)}
              >
                {weekday} <br />{" "}
                <span style={{ fontSize: "2em", fontWeight: "bold" }}>
                  {day}
                </span>
              </button>
            ))}
          {activeSegment === "reminders" &&
            remindersDays.map(({ day, weekday }) => (
              <button
                key={day}
                className={`card card-btn${activeCard === day ? " is-active" : ""
                  }`}
                onClick={() => setActiveCard(day)}
              >
                {weekday} <br />{" "}
                <span style={{ fontSize: "2em", fontWeight: "bold" }}>
                  {day}
                </span>
              </button>
            ))}
        </div>

        <div className="sidebar">
          <div className="sidebar-header">
            <h2 className="top-text">Project Kickoff: Alpha Launch</h2>
            <div className="check-container">
              <button
                className="check-btn"
                aria-haspopup="menu"
                aria-label="Attendance"
              >
                <img src={checkmark} className="check" alt="" />
              </button>
              <div className="check-dropdown" role="menu">
                <button role="menuitem">Attending</button>
                <button role="menuitem">Maybe</button>
                <button role="menuitem">Not attending</button>
              </div>
            </div>
          </div>
          <p>Conference Room 2B</p>
          <br />
          <small>
            Tuesday, September 9, 2025
            <br />
            10:00 am to 11:30 am
          </small>
          <br />
          <p>
            <h4 style={{ display: "inline", margin: 0 }}>Hosted by:</h4> Sarah
            Johnson <br></br>(Product Manager)
          </p>
          <br></br>
          <h2>Notes:</h2>
          <p>
            Initial kickoff meeting to align teams on project scope,
            deliverables, and timeline. Bring laptops and review the draft
            project charter in advance.
          </p>
          {role === "Admin" && (
          <a className="remove-event-link" href="#">
            {activeSegment === "reminders" ? "Remove Reminder" : "Remove Event"}
          </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;
