import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoomPage.css";

export default function AvailableRooms() {
  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modal-header">
        <button className="close-btn" onClick={() => navigate('/calendar')}>X</button>
        <h5 className="modal-title">Available rooms</h5>
      </div>

      <div className="table-header">
        <span>Rooms</span>
        <div className="datetime">
          <input type="date" defaultValue="Date" />
          <input type="time" defaultValue="Time" />
        </div>
        <span>Availability</span>
      </div>

      <div className="table-body">
        <div className="row">
          <div className="cell">Room 1</div>
          <div className="cell available">Available</div>
        </div>

        <div className="row">
          <div className="cell">Room 2</div>
          <div className="cell not-available">Not available</div>
        </div>

        <div className="row">
          <div className="cell">Room 3</div>
          <div className="cell available">Available</div>
        </div>

        <div className="row">
          <div className="cell">Room 4</div>
          <div className="cell not-available">Not available</div>
        </div>
      </div>

      <button className="confirm-btn">confirm</button>
    </div>
  );
}
