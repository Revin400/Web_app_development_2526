import React from "react";
import "./AdminHomePage.css";

const sampleEvents = [
    { id: 1, title: "1", description: "a", date: "2025-02-12" , createdBy: "Admin1"},
    { id: 2, title: "2", description: "b", date: "2025-03-01" , createdBy: "Admin2"},
    { id: 3, title: "3", description: "c", date: "2025-03-15" , createdBy: "Admin3"},
    { id: 4, title: "4", description: "d", date: "2025-04-05" , createdBy: "Admin4"},
    { id: 5, title: "5", description: "e", date: "2025-04-20" , createdBy: "Admin5"},
    { id: 6, title: "6", description: "f", date: "2025-05-08" , createdBy: "Admin6"},
    { id: 7, title: "7", description: "g", date: "2025-05-20" , createdBy: "Admin7"},
    { id: 8, title: "8", description: "h", date: "2025-06-02" , createdBy: "Admin8"},
    { id: 9, title: "9", description: "i", date: "2025-06-18" , createdBy: "Admin9"},
    { id: 10, title: "10", description: "j", date: "2025-07-01" , createdBy: "Admin10"},
];

function AdminHomePage() {
return (
    <div className="ahp-root">
      <header className="ahp-header ahp-container">
        <h1 className="ahp-title">Event Management</h1>
        <div className="ahp-headerActions">
          <button className="ahp-btn ahp-btnDark">
            Add Event
          </button>
          <button className="ahp-btn">Logout</button>
        </div>
      </header>

      <main className="ahp-container">
        <section className="ahp-card">
          <div className="ahp-tableWrap">
            <table className="ahp-table">
              <thead className="ahp-thead">
                <tr className="ahp-row">
                  <th className="ahp-cell">No.</th>
                  <th className="ahp-cell">Title</th>
                  <th className="ahp-cell">Description</th>
                  <th className="ahp-cell">Date</th>
                  <th className="ahp-cell">Created By</th>
                  <th className="ahp-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="ahp-tbody">
                {sampleEvents.map((e, idx) => (
                  <tr className="ahp-row" key={e.id}>
                    <td className="ahp-cell">{idx + 1}</td>
                    <td className="ahp-cell">{e.title}</td>
                    <td className="ahp-cell">{e.description}</td>
                    <td className="ahp-cell">{e.date}</td>
                    <td className="ahp-cell">{e.createdBy}</td>
                    <td className="ahp-cell">
                      <div className="ahp-rowActions">
                        <button
                          className="ahp-btn ahp-btnDark"
                        >
                          Edit
                        </button>
                        <button
                          className="ahp-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sampleEvents.length === 0 && (
                  <tr className="ahp-row">
                    <td className="ahp-cell ahp-empty" colSpan={6}>
                      No events yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );

}
export default AdminHomePage;