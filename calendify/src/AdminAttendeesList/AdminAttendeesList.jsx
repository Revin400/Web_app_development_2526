
export default function AdminAttendeesList() {
  const attendees = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Kim" },
    { id: 4, name: "Dana Lee" },
    { id: 5, name: "Evan Brown" },
  ];

  return (
    <div className="aal-container">
      <h2>Attendees</h2>
      <ul className="aal-list">
        {attendees.map((a) => (
          <li key={a.id} className="aal-item">
            <input type="checkbox" id={`attendee-${a.id}`} />
            <label htmlFor={`attendee-${a.id}`}>{a.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
