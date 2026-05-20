import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodayPage from './pages/TodayPage';
import CalendarPage from './pages/CalendarPage';
import EntriesPage from './pages/EntriesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodayPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/entries" element={<EntriesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
