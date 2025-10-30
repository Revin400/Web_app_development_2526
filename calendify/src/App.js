import './App.css';
import CalendarPage from './CalendarPage';
import NewEventPage from './NewEventPage';
import Login from './Login';
import WelcomeScreen from './WelcomeScreen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
<<<<<<< Updated upstream
=======
import SettingsPage from './Settingspage';
import RoomPage from './RoomPage'; 
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
        <Route path="/adminhomepage" element={<AdminHomePage />} />
        <Route path='/attendeeslist' element={<AdminAttendeesList/>} />
        <Route path="/settings" element={<SettingsPage />}  />
        <Route path="/roompage" element={<RoomPage />} /> 

>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
