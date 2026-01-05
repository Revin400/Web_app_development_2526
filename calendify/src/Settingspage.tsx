import "./Settingspage.css";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type ModalType = "password" | "email" | "notifications" | null;

const SettingsPage = () => {
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<ModalType>(null);

 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifInApp, setNotifInApp] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const passwordError = useMemo(() => {
    if (!newPassword && !confirmPassword) return "";
    if (newPassword.length > 0 && newPassword.length < 8) return "Nieuw wachtwoord moet minimaal 8 tekens zijn.";
    if (newPassword !== confirmPassword) return "Wachtwoorden komen niet overeen.";
    return "";
  }, [newPassword, confirmPassword]);

  const closeModal = () => setActiveModal(null);

  const overlayClose = (e: React.MouseEvent<HTMLDivElement>) => {
    // klik op overlay sluit modal
    if ((e.target as HTMLElement).classList.contains("settings-modal-overlay")) {
      closeModal();
    }
  };

  useEffect(() => {
    GetLoggedInUser();
  }, []);


  const HandleLogOut = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  
  const handleSaveNotifications = () => {
    // TODO: call API endpoint
    console.log("Save notifications", { notifEmail, notifInApp });
    closeModal();
  };
  
  
  const GetLoggedInUser =  async () => {
    try {
      const user = fetch("http://localhost:5000/api/Auth/session", {
        credentials: "include",
        method: "GET",
      });
      
      const userData = await user.then(res => res.json());
      setLoggedInUser(userData);
      
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!email || email !== emailConfirm) return;
    try {
      const res = await fetch(`http://localhost:5000/api/Employee/${loggedInUser?.userId}/change-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"oldEmail": loggedInUser?.email, "newEmail": email }),
      });

      if (res.ok) {
    setEmail("");
    setEmailConfirm("");
    closeModal();
    alert("Email succesvol gewijzigd.");

  }


  } catch (err) {
      console.error(err);
    }
  }

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      

      const res = await fetch(`http://localhost:5000/api/Employee/${loggedInUser?.userId}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"oldPassword": currentPassword, "newPassword": newPassword }),
      });

      if (res.ok) {
            // reset & close
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    closeModal();
  } 
  alert(`Wachtwoord succesvol gewijzigd.`);

  } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <a onClick={() => navigate("#")}>Change Password </a>
        <a onClick={() => navigate("#")}>Change Email</a>
        <a onClick={() => HandleLogOut()}>Log Out</a>
      </div>

      <div className="settings-content">
        <div className="settings-block">
          <div className="settings-upper-section">
            <h4 className="settings-neweventpill">Settings</h4>
          </div>

          <div className="settings-content-section">
            {/* LEFT */}
            <div className="settings-left-section">
              <div className="settings-left-content">
                {/* Account card */}
                <div
                  className="settings-left-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveModal("password")}
                  title="Open Account instellingen"
                >
                  <h3>Account</h3>
                  <p>Change your account settings and set preferences</p>

                  <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                    <button
                      className="settings-action-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModal("password");
                      }}
                    >
                      Change password
                    </button>

                    <button
                      className="settings-action-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModal("email");
                      }}
                    >
                      Change email
                    </button>
                  </div>
                </div>

                {/* Notifications card */}
                <div
                  className="settings-left-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveModal("notifications")}
                  title="Open Notifications instellingen"
                >
                  <h3>Notifications</h3>
                  <p>Manage your notification settings</p>

                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button
                      className="settings-action-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModal("notifications");
                      }}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="settings-right-section">
              <div className="settings-right-content">
                <h3>Account Settings</h3>
                <p style={{ marginTop: 12, opacity: 0.85 }}>
                  Open een item links om instellingen te wijzigen (password, email, notifications).
                </p>

                <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button className="settings-btn settings-btn-primary" onClick={() => setActiveModal("password")}>
                    Wachtwoord wijzigen
                  </button>
                  <button className="settings-btn settings-btn-primary" onClick={() => setActiveModal("email")}>
                    E-mail wijzigen
                  </button>
                  <button className="settings-btn settings-btn-primary" onClick={() => setActiveModal("notifications")}>
                    Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            MODALS
           ========================= */}

        {/* Password modal */}
        <div
          className="settings-modal-overlay"
          style={{ display: activeModal === "password" ? "flex" : "none" }}
          onClick={overlayClose}
        >
          <div className="settings-modal" role="dialog" aria-modal="true">
            <div className="settings-modal-header">
              <h3 className="settings-modal-title">Wachtwoord wijzigen</h3>
              <button className="settings-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="settings-modal-body">
              <div className="settings-form-grid">
                <div className="settings-form-row full">
                  <span className="settings-form-label">Huidig wachtwoord</span>
                  <input
                    className="settings-input"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div className="settings-form-row">
                  <span className="settings-form-label">Nieuw wachtwoord</span>
                  <input
                    className="settings-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 tekens"
                  />
                </div>

                <div className="settings-form-row">
                  <span className="settings-form-label">Bevestig nieuw wachtwoord</span>
                  <input
                    className="settings-input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nogmaals"
                  />
                </div>
              </div>

              {passwordError ? (
                <div className="settings-helper" style={{ color: "#ffcfbd" }}>
                  {passwordError}
                </div>
              ) : (
                <div className="settings-helper">Tip: gebruik minimaal 8 tekens + cijfer/symbool.</div>
              )}
            </div>

            <div className="settings-modal-footer">
              <button className="settings-btn settings-btn-ghost" onClick={closeModal}>
                Annuleren
              </button>
              <button
                className="settings-btn settings-btn-primary"
                onClick={handleSavePassword}
                disabled={!!passwordError || !currentPassword || !newPassword || !confirmPassword}
                style={{
                  opacity: !!passwordError || !currentPassword || !newPassword || !confirmPassword ? 0.55 : 1,
                  cursor:
                    !!passwordError || !currentPassword || !newPassword || !confirmPassword ? "not-allowed" : "pointer",
                }}
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>

        {/* Email modal */}
        <div
          className="settings-modal-overlay"
          style={{ display: activeModal === "email" ? "flex" : "none" }}
          onClick={overlayClose}
        >
          <div className="settings-modal" role="dialog" aria-modal="true">
            <div className="settings-modal-header">
              <h3 className="settings-modal-title">E-mail wijzigen</h3>
              <button className="settings-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="settings-modal-body">
              <div className="settings-form-grid">
                <div className="settings-form-row full">
                  <span className="settings-form-label">oude e-mailadres</span>
                  <input
                    className="settings-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="settings-form-row full">
                  <span className="settings-form-label">nieuw e-mailadres</span>
                  <input
                    className="settings-input"
                    type="email"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {email && emailConfirm && email !== emailConfirm ? (
                <div className="settings-helper" style={{ color: "#ffcfbd" }}>
                  E-mailadressen komen niet overeen.
                </div>
              ) : (
                <div className="settings-helper">Je krijgt eventueel een bevestigingsmail (als je dat zo instelt).</div>
              )}
            </div>

            <div className="settings-modal-footer">
              <button className="settings-btn settings-btn-ghost" onClick={closeModal}>
                Annuleren
              </button>
              <button
                className="settings-btn settings-btn-primary"
                onClick={handleSaveEmail}
                disabled={!email || email !== emailConfirm}
                style={{
                  opacity: !email || email !== emailConfirm ? 0.55 : 1,
                  cursor: !email || email !== emailConfirm ? "not-allowed" : "pointer",
                }}
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>

        {/* Notifications modal */}
        <div
          className="settings-modal-overlay"
          style={{ display: activeModal === "notifications" ? "flex" : "none" }}
          onClick={overlayClose}
        >
          <div className="settings-modal" role="dialog" aria-modal="true">
            <div className="settings-modal-header">
              <h3 className="settings-modal-title">Notifications</h3>
              <button className="settings-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="settings-modal-body">
              <div className="settings-form-row" style={{ gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>E-mail notificaties</div>
                    <div style={{ opacity: 0.85, fontSize: 14 }}>Ontvang updates via e-mail.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.checked)}
                    style={{ transform: "scale(1.4)" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>In-app notificaties</div>
                    <div style={{ opacity: 0.85, fontSize: 14 }}>Toasts/alerts in de app.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifInApp}
                    onChange={(e) => setNotifInApp(e.target.checked)}
                    style={{ transform: "scale(1.4)" }}
                  />
                </div>
              </div>

              <div className="settings-helper">Klik “Opslaan” om je voorkeuren te bewaren.</div>
            </div>

            <div className="settings-modal-footer">
              <button className="settings-btn settings-btn-ghost" onClick={closeModal}>
                Annuleren
              </button>
              <button className="settings-btn settings-btn-primary" onClick={handleSaveNotifications}>
                Opslaan
              </button>
            </div>
          </div>
        </div>

        {/* End */}
      </div>
    </div>
  );
};

export default SettingsPage;
