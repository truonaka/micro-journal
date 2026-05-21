import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Today from "./pages/Today";
import Calendar from "./pages/Calendar";
import Entries from "./pages/Entries";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Today</Link> | 
        <Link to="/calendar">Calendar</Link> | 
        <Link to="/entries">Entries</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/entries" element={<Entries />} />
      </Routes>
    </BrowserRouter>
  );
}