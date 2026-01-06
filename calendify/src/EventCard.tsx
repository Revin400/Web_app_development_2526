import { EventType } from "./types/EventType";

type EventCardProps = {
  key ?: number;
  event: EventType;
  isActive: boolean;
  onSelect: (event: EventType) => void;
};

export function EventCard({ event, isActive, onSelect }: EventCardProps) {
  const date = new Date(event.eventDate);

  const day = date.getDate();
  const weekday = date
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  return (
    <button
      className={`card card-btn${isActive ? " is-active" : ""}`}
      onClick={() => onSelect(event)}
    >
      {weekday}
      <br />
      <span style={{ fontSize: "2em", fontWeight: "bold" }}>
        {day}
      </span>
    </button>
  );
}
