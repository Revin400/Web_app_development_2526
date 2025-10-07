import "./CalendarPage.css";
import React from "react";
const CalendarPage = () => {
  const [activeCard, setActiveCard] = React.useState(null);

  const eventDays = [
    { day: 1, weekday: "MON" },
    { day: 7, weekday: "SUN" },
    { day: 24, weekday: "FRI" },
    { day: 25, weekday: "SAT" },
  ];

  return (
    <div className="page">
      <header className="topbar">
      </header>

      <section className="content">
        <div className="segment">
          <button className="seg-btn is-active">events</button>
          <button className="seg-btn">reminders</button>
        </div>
        <div className="cards">
          {eventDays.map(({ day, weekday }) => (
            <button
              key={day}
              className={`card card-btn${
                activeCard === day ? " is-active" : ""
              }`}
              onClick={() => setActiveCard(day)}
            >
             {weekday}  <br /> <span style={{ fontSize: "2em", fontWeight: "bold" }}>{day}</span>
            </button>
          ))}
        </div>

        <aside className="sidebar">
          <h2>Project Kickoff: Alpha Launch</h2>
          <p>Conference Room 2B</p>
          <br />
          <small>Tuesday, September 9, 2025<br />
10:00 am to 11:30 am</small>
          <br />
          <p>
            <h4 style={{ display: "inline", margin: 0 }}>Hosted by:</h4> Sarah Johnson <br></br>(Product Manager)
          </p>
          <br></br>
          <h2>Notes:</h2>
          <p>Initial kickoff meeting to align teams on project scope, deliverables, and timeline. Bring laptops and review the draft project charter in advance.</p>
          <a class="remove-event-link" href="#">Remove Event</a>
        </aside>
      </section>
     
    </div>
  );
};

export default CalendarPage;
