import './App.css';
import CalendarPage from './CalendarPage';
import NewEventPage from './NewEventPage';
import Login from './Login';
import WelcomeScreen from './WelcomeScreen';
import NewReminderPage from './NewReminderPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
      </nav>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/new-event" element={<NewEventPage />} />
        <Route path="/new-reminder" element={<NewReminderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
