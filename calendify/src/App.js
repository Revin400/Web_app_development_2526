import './App.css';
import CalendarPage from './CalendarPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
      </nav>
      <Routes>
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
