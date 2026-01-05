import "./RoomPage.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

interface Booking {
  roomId: number;
  userId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

interface SessionResponse {
  userId: number | null;
  isLoggedIn: boolean;
  name: string | null;
  role: string | null;
}

const RoomPage: React.FC = () => {
  const navigate = useNavigate();
  const rooms = [1, 2, 3, 4];

  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const [message, setMessage] = useState<string | null>(null); // new state for frontend messages

  // Load session on page load
  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/Auth/session", {
          credentials: "include",
        });
        const data: SessionResponse = await res.json();
        if (!data.isLoggedIn || !data.userId) {
          setMessage("You must be logged in to book a room.");
          navigate("/login");
          return;
        }
        setUserId(data.userId);
      } catch {
        setMessage("Failed to check login session.");
      }
    };
    loadSession();
  }, [navigate]);

const handleConfirm = async () => {
  setMessage(null); // clear previous message

  if (!selectedRoom || !date || !startTime || !endTime || !purpose) {
    setMessage("Please fill in all fields");
    return;
  }
  if (!userId) {
    setMessage("You must be logged in to book a room.");
    return;
  }

  const booking: Booking = {
    roomId: selectedRoom,
    userId,
    bookingDate: date,
    startTime: startTime + ":00",
    endTime: endTime + ":00",
    purpose,
  };

  try {
    const response = await fetch("http://localhost:5000/api/RoomBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(booking),
    });

    if (response.ok) {
      setMessage("Room booked successfully!");
      // Clear form
      setSelectedRoom(null);
      setDate("");
      setStartTime("");
      setEndTime("");
      setPurpose("");
    } else if (response.status === 409) {
      // Conflict: room already booked
      try {
        const json = await response.json();
        setMessage(json.message || "Room is already booked for this timeslot");
      } catch {
        setMessage("Room is already booked for this timeslot");
      }
    } else {
      // Other errors
      const text = await response.text();
      setMessage(text || "An error occurred while booking the room");
    }
  } catch (err: any) {
    setMessage(err.message);
  }
};

  return (
    <div className="page">
      <section className="form-content">
        <div className="new-event-form">
          <div className="upper-section">
            <button className="closebtn" onClick={() => navigate("/calendar")}>
              X
            </button>
            <h4 className="neweventpill">Book a room</h4>
          </div>

          <div className="form-section-1">
            {rooms.map((room) => (
              <div
                key={room}
                className={`input-field input-button-field ${
                  selectedRoom === room ? "selected" : ""
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <span>Room {room}</span>
                <span className="arrow">{selectedRoom === room ? "✓" : "›"}</span>
              </div>
            ))}
          </div>

          <div className="form-section-2">
            <div className="row">
              <span className="label">Date</span>
              <input
                type="date"
                className="chip-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="row">
              <span className="label">Starts</span>
              <input
                type="time"
                className="chip-input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="row">
              <span className="label">Ends</span>
              <input
                type="time"
                className="chip-input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-section-3">
            <textarea
              className="input-field"
              placeholder="Purpose (meeting, call...)"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={4}
            />
          </div>

          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>

          {/* Display message below the form */}
          {message && <div className="message">{message}</div>}
        </div>
      </section>
    </div>
  );
};

export default RoomPage;
