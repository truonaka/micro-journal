// Mood.js
// Helper component to render mood as emoji and color

const MOOD_MAP = {
    great: { emoji: "😃", color: "#4caf50", toneClass: "mood-great" },
    good: { emoji: "🙂", color: "#8bc34a", toneClass: "mood-good" },
    okay: { emoji: "😐", color: "#ffeb3b", toneClass: "mood-okay" },
    rough: { emoji: "😕", color: "#ff9800", toneClass: "mood-rough" },
    bad: { emoji: "😞", color: "#f44336", toneClass: "mood-bad" },
};

export default function Mood({ mood, withText = false }) {
    const m = MOOD_MAP[mood] || { emoji: "❓", color: "#ccc", toneClass: "mood-unknown" };
    return (
        <span className={`mood-badge ${m.toneClass}`} title={mood}>
            {m.emoji}
            {withText ? <span className="mood-text">{mood}</span> : null}
        </span>
    );
}

export { MOOD_MAP };
