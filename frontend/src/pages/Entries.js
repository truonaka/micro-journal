import { useEntriesQuery } from "../api";
import Mood from "../components/Mood";

export default function Entries() {
    const entriesQuery = useEntriesQuery();
    const entries = entriesQuery.data || [];

    return (
        <div className="entries-page">
            <h2>Entries</h2>
            {entriesQuery.isPending && <div>Loading entries...</div>}
            {!entriesQuery.isPending && entries.length === 0 && <div>No entries yet.</div>}
            {!entriesQuery.isPending && entries.map(e => (
                <div key={e.id} className="entry-row">
                    <b>{e.date}</b>: {e.content} <Mood mood={e.mood} />
                </div>
            ))}
        </div>
    );
}