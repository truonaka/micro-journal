import { useEffect, useState } from "react";
import { getEntry, saveEntry } from "../api";
import Mood, { MOOD_MAP } from "../components/Mood";

const moods = ["great", "good", "okay", "rough", "bad"];


export default function Today() {
    const today = new Date().toISOString().slice(0, 10);

    const [content, setContent] = useState("");
    const [mood, setMood] = useState("okay");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getEntry(today).then(e => {
            if (e) {
                setContent(e.content);
                setMood(e.mood);
            }
        });
    }, []);

    const save = async () => {
        setError("");
        setSuccess(false);
        try {
            const res = await saveEntry({ date: today, content, mood });
            if (res.detail) {
                setError(res.detail);
            } else {
                setSuccess(true);
            }
        } catch (e) {
            setError("Save failed");
        }
    };

    return (
        <div>
            <h2>Today's Entry</h2>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 8 }}>Saved!</div>}
            <textarea maxLength={280} value={content} onChange={e => setContent(e.target.value)} />


            <div style={{ margin: '8px 0' }}>
                {moods.map(m => (
                    <button
                        key={m}
                        type="button"
                        style={{
                            marginRight: 8,
                            background: mood === m ? MOOD_MAP[m].color + '33' : '#f5f5f5',
                            border: mood === m ? '2px solid ' + MOOD_MAP[m].color : '1px solid #ccc',
                            borderRadius: 6,
                            padding: '4px 10px',
                            cursor: 'pointer',
                            fontWeight: mood === m ? 'bold' : 'normal'
                        }}
                        onClick={() => setMood(m)}
                    >
                        <Mood mood={m} />
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                ))}
            </div>

            <button onClick={save}>Save</button>
        </div>
    );
}