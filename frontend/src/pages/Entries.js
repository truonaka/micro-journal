import { useEffect, useState } from "react";
import { getEntries } from "../api";
import Mood from "../components/Mood";

export default function Entries() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getEntries().then(setEntries);
    }, []);

    return (
        <div>
            <h2>Entries</h2>
            {entries.length === 0 && <div>No entries yet.</div>}
            {entries.map(e => (
                <div key={e.id} style={{ marginBottom: 8 }}>
                    <b>{e.date}</b>: {e.content} <Mood mood={e.mood} />
                </div>
            ))}
        </div>
    );
}