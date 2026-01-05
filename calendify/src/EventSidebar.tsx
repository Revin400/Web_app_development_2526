import { EventType } from "./types/EventType";
import checkmark from "./check-img.png";


type EventSidebarProps = {
  event: EventType | null;
  participationStatus: string | null;
  role: string | null;
  userId: number;
  onAttend: (eventId: number, userId: number) => void;
  onRemove: (eventId: number, userId: number) => void;
};

export function EventSidebar({
  event,
  participationStatus,
  role,
  userId,
  onAttend,
  onRemove,
}: EventSidebarProps) {
  if (!event) {
    return <p>Select date to view details</p>;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{event.title}</h2>

        <div className="check-container">
          <button className="check-btn">
            <img src={checkmark} className="check" alt="" />
          </button>

          <div className="check-dropdown">
            <button onClick={() => onAttend(event.id, userId)}>
              Attending
            </button>
            <button onClick={() => onRemove(event.id, userId)}>
              Not Attending
            </button>
          </div>
        </div>
      </div>

      <small>
        {new Date(event.eventDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </small>

      <p>{event.description}</p>

      <p>
        <strong>Created by:</strong> {event.createdBy}
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
    </div>
  );
}
