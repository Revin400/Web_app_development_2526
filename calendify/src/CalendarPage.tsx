import "./CalendarPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import calendifylogo from "./calendifylogo.png";
import Profilepic from "./Default_pfp.png";
import checkmark from "./check-img.png";
import { useSession } from "./hooks/useSession";


const CalendarPage = () => {
  const location = useLocation();
  const [activeCard, setActiveCard] = React.useState(null);
  const [activeSegment, setActiveSegment] = React.useState<
  "Events" | "My Events"
>(() => {
  return location.state?.activeSegment ?? "Events";
});
  const navigate = useNavigate();
  const { userId, role, loading, isLoggedIn, name } = useSession();
  const [Events, setEvents] = React.useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<EventType | null>(
    null
  );
  const [popupMessage, setPopupMessage] = React.useState<string | null>(null);
  const [popupType, setPopupType] = React.useState<"success" | "error">(
    "success"
  );

  const [participationStatus, setParticipationStatus] = useState<
    "Attending" | "Not attending" | null
  >(null);

  const [MyEvents, setMyEvents] = useState<EventType[]>([]);


useEffect(() => {
  setSelectedEvent(null);
  setParticipationStatus(null);
}, [activeSegment]);


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
  
    fetchMyEvents();
    fetch("http://localhost:5000/api/Events", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch(() => console.log("Failed to load Events"));
  }, []);

  const EventsDays = Events.map((e) => {
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
  const fetchMyEvents = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/eventparticipation/myEvents",
        { credentials: "include" }
      );
      const data = await res.json();
      setMyEvents(data);
    } catch (error) {
      console.error("Error fetching my Events:", error);
    }
  };

  const HandleEventParticipation = async (eventId: number, userId: number) => {
    if (!userId) return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/eventparticipation/participate",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, userId }),
        }
      );

      const message = await res.text();

      if (!res.ok) {
        setPopupType("error");
        setPopupMessage(message);
        return;
      }

      setPopupType("success");
      setPopupMessage("You are now attending this event");

      setParticipationStatus("Attending");

      fetchParticipationStatus(eventId);
      fetchMyEvents();
    } catch {
      setPopupType("error");
      setPopupMessage("Network error");
    }
  };

  const HandleRemoveParticipation = async (eventId: number, userId: number) => {
    if (!userId) return;

    try {
      const res = await fetch("http://localhost:5000/api/eventparticipation", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userId }),
      });

      const message = await res.text();

      if (!res.ok) {
        setPopupType("error");
        setPopupMessage(message);
        return;
      }

      setPopupType("success");
      setPopupMessage("You are no longer attending this event");

      setParticipationStatus("Not attending");

      fetchParticipationStatus(eventId);
      fetchMyEvents();
      setActiveSegment("Events");
    } catch {
      setPopupType("error");
      setPopupMessage("Network error");
    }
  };

  const fetchParticipationStatus = async (eventId: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/eventparticipation/status/${eventId}`,
        { credentials: "include" }
      );

      if (!res.ok) {
        setParticipationStatus("Not attending");
        return;
      }

      const data = await res.json();
      setParticipationStatus(data.status);
    } catch {
      setParticipationStatus("Not attending");
    }
  };

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
              aria-selected={activeSegment === "Events"}
              className={`seg-btn ${activeSegment === "Events" ? "is-active" : ""
                }`}
              onClick={() => setActiveSegment("Events")}
            >
              Events
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSegment === "My Events"}
              className={`seg-btn ${activeSegment === "My Events" ? "is-active" : ""
                }`}
              onClick={() => setActiveSegment("My Events")}
            >
              My Events
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
                  activeSegment === "My Events" ? "/new-reminder" : "/new-event"
                )
              }
            >
              {activeSegment === "My Events" && "+ Add Event"}
            </button>
          )}
        </div>
        <div className="cards">
          {activeSegment === "Events" &&
            EventsDays.map(({ id, day, weekday, fullEvent }) => (
              <button
                key={id}
                className={`card card-btn${selectedEvent?.id === id ? " is-active" : ""
                  }`}
                onClick={() => {
                  setSelectedEvent(fullEvent);
                  fetchParticipationStatus(fullEvent.id);
                }}
              >
                {weekday} <br />
                <span style={{ fontSize: "2em", fontWeight: "bold" }}>
                  {day}
                </span>
              </button>
            ))}
          {activeSegment === "My Events" &&
            MyEvents.map((event) => {
              const date = new Date(event.eventDate);
              const day = date.getDate();
              const weekday = date
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase();

              return (
                <button
                  key={event.id}
                  className={`card card-btn${selectedEvent?.id === event.id ? " is-active" : ""
                    }`}
                  onClick={() => {
                    setSelectedEvent(event);
                    fetchParticipationStatus(event.id);
                  }}
                >
                  {weekday} <br />
                  <span style={{ fontSize: "2em", fontWeight: "bold" }}>
                    {day}
                  </span>
                </button>
              );
            })}
        </div>

        {selectedEvent ? (
          <div className="sidebar">
            <>
              <div className="sidebar-header">
                <h2 className="top-text">{selectedEvent.title}</h2>

                <div className="check-container">
                  <button
                    className="check-btn"
                    aria-haspopup="menu"
                    aria-label="Attendance"
                  >
                    <img src={checkmark} className="check" alt="" />
                  </button>

                  <div className="check-dropdown" role="menu">
                    <button
                      role="menuitem"
                      onClick={() =>
                        HandleEventParticipation(selectedEvent.id, userId)
                      }
                    >
                      Attending
                    </button>
                    <button
                      role="menuitem"
                      onClick={() =>
                        HandleRemoveParticipation(selectedEvent.id, userId)
                      }
                    >
                      Not Attending
                    </button>
                  </div>
                </div>
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

              {participationStatus && (
                <p className="participation-status">
                  <strong>Status:</strong> {participationStatus}
                </p>
              )}

              {role === "Admin" && (
                <a className="remove-event-link" href="#">
                  Remove Event
                </a>
              )}
            </>
          </div>
        ) : (
          <p>Select date to view details</p>
        )}
      </section>
      {popupMessage && (
        <div className="ahp-modalBackdrop">
          <div className="ahp-modal">
            <h2 className="ahp-modalTitle">
              {popupType === "success" ? "Success" : "Error"}
            </h2>

            <p>{popupMessage}</p>

            <div className="ahp-formActions">
              <button
                className="ahp-btn ahp-btnDark"
                onClick={() => setPopupMessage(null)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
