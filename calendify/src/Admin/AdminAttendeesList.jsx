import "./AdminAttendeesList.css";
import React, {useState} from "react";

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

  const [checked, setChecked] = useState(Checked);

  const toggle = (index) => {
      const newArray = [...checked];

      if (newArray[index] === true) {
        newArray[index] = false;
      } else {
        newArray[index] = true;
      }
      setChecked(newArray);  

  };
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
              //hier word de attendee checked of unchecked en dan toggled de bg
              className={`attendee ${checked[i] ? "checked" : "unchecked"}`}
            >
              <span className="attendeesname">{p.name}</span>

              <label
                // hier veranderd de pill
                className={`switch ${checked[i] ? "on" : "off"}`}
                aria-label={`Toggle ${p.name}`}
              >
                <input
                  type="checkbox"
                  checked={checked[i]}
                  // de toggle functie aan en veranded de bool van de newArray
                  onChange={() => toggle(i)}
                  
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
