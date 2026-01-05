import React, { useEffect, useState, FormEvent, ChangeEvent, FC } from "react";
import "./AdminHomePage.css";

const API_BASE = "http://localhost:5000/api/events";

interface EventItem {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  createdBy: string;
}

const emptyForm: EventItem = {
  id: 0,
  title: "",
  description: "",
  eventDate: "",
  createdBy: "",
};

const formatDateForDisplay = (value: string) => {
  if (!value) return "";
  if (value.length >= 10) return value.slice(0, 10);
  return value;
};

const AdminHomePage: FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<EventItem>(emptyForm);

  // load events
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to load events");

      const data: EventItem[] = await res.json();
      setEvents(
        data.map((e) => ({
          ...e,
          eventDate: formatDateForDisplay(e.eventDate),
        }))
      );
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // delete
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204)
        throw new Error("Failed to delete event");

      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(err.message ?? "Error deleting event");
    }
  };

  // open forms
  const openAddForm = () => {
    setEditingId(null);
    setFormValues(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (ev: EventItem) => {
    setEditingId(ev.id);
    setFormValues({
      id: ev.id,
      title: ev.title,
      description: ev.description,
      eventDate: formatDateForDisplay(ev.eventDate),
      createdBy: ev.createdBy,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormValues(emptyForm);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: EventItem = {
      ...formValues,
      eventDate: formValues.eventDate, // yyyy-MM-dd
    };

    try {
      let res: Response;
      if (editingId == null) {
        // create
        res = await fetch(API_BASE, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // update
        res = await fetch(`${API_BASE}/${editingId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save event");

      await loadEvents();
      closeForm();
    } catch (err: any) {
      alert(err.message ?? "Error saving event");
    }
  };

  return (
    <div className="ahp-root">
      <header className="ahp-header ahp-container">
        <h1 className="ahp-title">Event Management</h1>
        <div className="ahp-headerActions">
          <button className="ahp-btn ahp-btnDark" onClick={openAddForm}>
            Add Event
          </button>
          <button className="ahp-btn">Logout</button>
        </div>
      </header>

      <main className="ahp-container">
        <section className="ahp-card">
          <div className="ahp-tableWrap">
            {loading && <p className="ahp-infoText">Loading events...</p>}
            {error && <p className="ahp-errorText">{error}</p>}

            {!loading && !error && (
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
                  {events.map((e, idx) => (
                    <tr className="ahp-row" key={e.id}>
                      <td className="ahp-cell">{idx + 1}</td>
                      <td className="ahp-cell">{e.title}</td>
                      <td className="ahp-cell">{e.description}</td>
                      <td className="ahp-cell">
                        {formatDateForDisplay(e.eventDate)}
                      </td>
                      <td className="ahp-cell">{e.createdBy}</td>
                      <td className="ahp-cell">
                        <div className="ahp-rowActions">
                          <button
                            className="ahp-btn ahp-btnDark"
                            onClick={() => openEditForm(e)}
                          >
                            Edit
                          </button>
                          <button
                            className="ahp-btn"
                            onClick={() => handleDelete(e.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {events.length === 0 && !loading && (
                    <tr className="ahp-row">
                      <td className="ahp-cell ahp-empty" colSpan={6}>
                        No events yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
      {isFormOpen && (
        <div className="ahp-modalBackdrop">
          <div className="ahp-modal">
            <h2 className="ahp-modalTitle">
              {editingId == null ? "Add Event" : "Edit Event"}
            </h2>
            <form className="ahp-form" onSubmit={handleSubmit}>
              <label className="ahp-formField">
                <span>Title</span>
                <input
                  name="title"
                  type="text"
                  value={formValues.title}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label className="ahp-formField">
                <span>Description</span>
                <textarea
                  name="description"
                  rows={3}
                  value={formValues.description}
                  onChange={handleInputChange}
                />
              </label>

              <label className="ahp-formField">
                <span>Date</span>
                <input
                  name="eventDate"
                  type="date"
                  value={formValues.eventDate}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label className="ahp-formField">
                <span>Created By</span>
                <input
                  name="createdBy"
                  type="text"
                  value={formValues.createdBy}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="ahp-formActions">
                <button type="button" className="ahp-btn" onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="ahp-btn ahp-btnDark">
                  {editingId == null ? "Create" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;
