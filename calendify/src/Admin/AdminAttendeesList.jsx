import "./AdminAttendeesList.css";
import react from "react";

const seed = [
  { name: "Alice Johnson" },
  { name: "Alice Johnson" },
  { name: "Alice Johnson" },
  { name: "Alice Johnson" },
  { name: "Alice Johnson" },
  { name: "Alice Johnson" },
  { name: "Alice Johnson" },
  { name: "Alice Johnson" }
];

const Checked = [true, false, false, true, true, true, false, true];

function AdminAttendeesList() {
  return (
    <div className="attendeespage">
      <main className="attendeescard">
        <header className="attendeescard-header">
          <h1 className="attendeestitle">Attendees Checklist</h1>
          <div className="attendeestab">Event HR</div>
        </header>

        <ul className="attendeeslist">
          {seed.map((p, i) => (
            <li
              key={i}
              className={`attendee ${Checked[i] ? "checked" : "unchecked"}`}
            >
              <span className="attendeesname">{p.name}</span>

              <label
                className={`switch ${Checked[i] ? "on" : "off"}`}
                aria-label={`Toggle ${p.name}`}
              >
                <input
                  type="checkbox"
                  checked={Checked[i]}
                />
                <span className="track"><span className="thumb" /></span>
              </label>
            </li>
          ))}
        </ul>

        <div className="actions">
          <button className="btn">confirm</button>
        </div>
      </main>
    </div>
  );
}

export default AdminAttendeesList;
