import './App.css';
import CalendarPage from './CalendarPage';
import NewEventPage from './NewEventPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
      </nav>
      <Routes>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/new-event" element={<NewEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
