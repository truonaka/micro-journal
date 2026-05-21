
import { useEffect, useState } from "react";
import { getEntries, getStats } from "../api";
import MonthCalendar from "../components/MonthCalendar";
import Mood from "../components/Mood";

export default function Calendar() {
    const [entries, setEntries] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        getEntries().then(setEntries);
        getStats().then(setStats);
    }, []);

    // Laske yleisin moodi
    let mostCommon = null;
    if (stats && Object.keys(stats).length > 0) {
        mostCommon = Object.entries(stats).sort((a, b) => b[1] - a[1])[0][0];
    }

    return (
        <div>
            <h2>Calendar</h2>
            {entries.length === 0 && <div>No entries yet for this month.</div>}
            <MonthCalendar entries={entries} />
            <div style={{ marginTop: 24 }}>
                <b>Legend:</b> {['great', 'good', 'okay', 'rough', 'bad'].map(m => <Mood key={m} mood={m} withText />)}
            </div>
            <div style={{ marginTop: 24 }}>
                <b>Most common mood (all time):</b> {mostCommon ? <Mood mood={mostCommon} withText /> : '—'}
            </div>
        </div>
    );
}
