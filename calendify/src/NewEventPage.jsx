import "./NewEventPage.css";

    const NewEventPage = () => {
    return (
        <div className="page">
        <section className="content">
            <form className="new-event-form">
            <div class="close-btn">
               <a className="closebtnn" href="/calendar">X</a>
               <h4 className="neweventpill">New event</h4>
            </div>

            <div className="form-section-1">
                
                <input class="input-field" type="text" placeholder="Title" />
                <input
                class="input-field"
                type="text"
                placeholder="Location or Video Call"
                />
                <input class="input-field" type="text" placeholder="Hosted By" />
                <input class="input-field" type="text" placeholder="Invitees" />
            </div>
            <div className="form-section-2">
                <div className="row">
                <span className="label" style={{ color: "grey" }}>Starts</span>
                <div className="pickers">
                    <input
                    type="date"
                    className="chip-input"
                    defaultValue="2025-10-03"
                    />
                    <input
                    type="time"
                    className="chip-input"
                    defaultValue="06:00"
                    />
                </div>
                </div>

                <div className="row">
                <span className="label" style={{ color: "grey" }}>Ends</span>
                <div className="pickers">
                    <input
                    type="date"
                    className="chip-input"
                    defaultValue="2025-10-03"
                    />
                    <input
                    type="time"
                    className="chip-input"
                    defaultValue="09:00"
                    />
                </div>
                </div>
            </div>
            <div className="form-section-3">
                <textarea
                class="input-field"
                placeholder="Notes"
                rows={5}
                style={{ width: "100%" }}
                />
            </div>
            <button className="confirm-btn">confirm</button>
            </form>
        </section>
        </div>
    );
    };

    export default NewEventPage;
