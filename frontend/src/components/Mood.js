// Mood.js
// Helper component to render mood as emoji and color

const MOOD_MAP = {
    great: { emoji: "😃", color: "#4caf50" },
    good: { emoji: "🙂", color: "#8bc34a" },
    okay: { emoji: "😐", color: "#ffeb3b" },
    rough: { emoji: "😕", color: "#ff9800" },
    bad: { emoji: "😞", color: "#f44336" },
};

export default function Mood({ mood, withText = false }) {
    const m = MOOD_MAP[mood] || { emoji: "❓", color: "#ccc" };
    return (
        <span style={{ color: m.color, fontWeight: "bold", fontSize: "1.2em", marginRight: 4 }} title={mood}>
            {m.emoji} {withText ? mood : null}
        </span>
    );
}

export { MOOD_MAP };
