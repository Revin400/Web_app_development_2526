import "./CalendarPage.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calendifylogo from "./calendifylogo.png";
import Profilepic from "./Default_pfp.png";
import checkmark from "./check-img.png";
import { useSession } from "./hooks/useSession";

const CalendarPage = () => {
  const [activeCard, setActiveCard] = React.useState(null);
  const [activeSegment, setActiveSegment] = React.useState("events");
  const navigate = useNavigate();
  const { role, loading, isLoggedIn, name } = useSession();

  const [events, setEvents] = React.useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<EventType | null>(
    null
  );

  type EventType = {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    createdBy: string;
  };

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch(() => console.log("Failed to load events"));
  }, []);

  const eventsDays = events.map((e) => {
    const date = new Date(e.eventDate);
    const day = date.getDate();
    const weekday = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    return {
      id: e.id,
      day,
      weekday,
      fullEvent: e,
    };
  });

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
          <img
            src={calendifylogo}
            alt="Calendify Logo"
            className="logo-image"
          />
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
              className={`seg-btn ${
                activeSegment === "events" ? "is-active" : ""
              }`}
              onClick={() => setActiveSegment("events")}
            >
              events
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSegment === "reminders"}
              className={`seg-btn ${
                activeSegment === "reminders" ? "is-active" : ""
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
              <button
                onClick={() => {
                  fetch("http://localhost:5000/api/Auth/logout", {
                    method: "POST",
                    credentials: "include",
                  }).then(() => {
                    navigate("/");
                  });
                }}
              >
                Logout
              </button>
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
            eventsDays.map(({ id, day, weekday, fullEvent }) => (
              <button
                key={id}
                className={`card card-btn${
                  selectedEvent?.id === id ? " is-active" : ""
                }`}
                onClick={() => setSelectedEvent(fullEvent)}
              >
                {weekday} <br />
                <span style={{ fontSize: "2em", fontWeight: "bold" }}>
                  {day}
                </span>
              </button>
            ))}
          {activeSegment === "reminders" &&
            remindersDays.map(({ day, weekday }) => (
              <button
                key={day}
                className={`card card-btn${
                  activeCard === day ? " is-active" : ""
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

          {selectedEvent ? (
        <div className="sidebar">
            <>
              <div className="sidebar-header">
                <h2 className="top-text">{selectedEvent.title}</h2>
              </div>

              <small>
                {new Date(selectedEvent.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>

              <br />
              <p>{selectedEvent.description}</p>

              <p>
                <strong>Created by:</strong> {selectedEvent.createdBy}
              </p>

              {role === "Admin" && (
                <a className="remove-event-link" href="#">
                  Remove Event
                </a>
              )}
            </>
          
        </div>
          ): 
          <p>Select date to view details</p>}
      </section>
    </div>
  );
};

export default CalendarPage;
