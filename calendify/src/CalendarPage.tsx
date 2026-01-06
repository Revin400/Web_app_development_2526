import "./CalendarPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import calendifylogo from "./calendifylogo.png";
import Profilepic from "./Default_pfp.png";
import { useSession } from "./hooks/useSession";
import { EventType } from "./types/EventType";
import { EventCard } from "./EventCard";
import { EventSidebar } from "./EventSidebar";

const CalendarPage = () => {
  const location = useLocation();
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
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
  const groupedEvents = groupEventsByMonth(Events);
  const groupedMyEvents = groupEventsByMonth(MyEvents);

  useEffect(() => {
    setSelectedEvent(null);
    setParticipationStatus(null);
  }, [activeSegment]);

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

  function groupEventsByMonth(events: EventType[]) {
    return events.reduce<Record<string, EventType[]>>((groups, event) => {
      const date = new Date(event.eventDate);

      const key = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(event);
      return groups;
    }, {});
  }

  function getAvailableMonths(events: EventType[]) {
    const months = new Set<string>();

    events.forEach((event) => {
      const date = new Date(event.eventDate);
      const label = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      months.add(label);
    });

    return Array.from(months);
  }

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
              className={`seg-btn ${
                activeSegment === "Events" ? "is-active" : ""
              }`}
              onClick={() => setActiveSegment("Events")}
            >
              Events
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSegment === "My Events"}
              className={`seg-btn ${
                activeSegment === "My Events" ? "is-active" : ""
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

  <button onClick={() => navigate("/settings")}>
    Settings
  </button>

  {/* 👇 NEW ROOM PAGE BUTTON */}
  <button onClick={() => navigate("/roompage")}>
    Room Booking
  </button>

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
            <div className="profile-dropdown">
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
              onClick={() =>navigate("/adminhomepage")}>
              Manage Events
            </button>
          )}
        </div>
        <div className="cards">
          <div className="month-selector">
            <label>
              Month:&nbsp;
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="All">All</option>
                {getAvailableMonths(
                  activeSegment === "Events" ? Events : MyEvents
                ).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {activeSegment === "Events" &&
            Object.entries(groupedEvents)
  .filter(([month]) => selectedMonth === "All" || month === selectedMonth).map(([monthYear, events]) => (
              <div key={monthYear}>
                <h2 className="calendar-month">{monthYear}</h2>

                <div className="cards">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isActive={selectedEvent?.id === event.id}
                      onSelect={(event) => {
                        setSelectedEvent(event);
                        fetchParticipationStatus(event.id);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

          {activeSegment === "My Events" &&
            Object.entries(groupedMyEvents).filter(([month]) => selectedMonth === "All" || month === selectedMonth).map(([monthYear, events]) => (
              <div key={monthYear}>
                <h2 className="calendar-month">{monthYear}</h2>

                <div className="cards">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isActive={selectedEvent?.id === event.id}
                      onSelect={(event) => {
                        setSelectedEvent(event);
                        fetchParticipationStatus(event.id);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>

        <EventSidebar
          event={selectedEvent}
          participationStatus={participationStatus}
          role={role}
          userId={userId}
          onAttend={HandleEventParticipation}
          onRemove={HandleRemoveParticipation}
        />
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
