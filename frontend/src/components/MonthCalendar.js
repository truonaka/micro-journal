// MonthCalendar.js
import React from "react";
import Mood, { MOOD_MAP } from "./Mood";

function getMonthDays(year, month) {
    // month: 0-based
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push(new Date(year, month, d));
    }
    return days;
}

export default function MonthCalendar({ entries }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const days = getMonthDays(year, month);

    // Map entries by date string
    const entryMap = {};
    entries.forEach(e => {
        entryMap[e.date] = e;
    });

    // Find first day of week (0=Sun)
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    // Pad start
    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
        cells.push(<td key={"pad-" + i}></td>);
    }

    days.forEach(day => {
        const dateStr = day.toISOString().slice(0, 10);
        const entry = entryMap[dateStr];
        cells.push(
            <td key={dateStr} style={{ textAlign: "center", padding: 6, background: entry ? MOOD_MAP[entry.mood]?.color + "22" : "#f5f5f5", borderRadius: 6 }}>
                <div style={{ fontSize: "0.8em", color: "#888" }}>{day.getDate()}</div>
                {entry ? <Mood mood={entry.mood} /> : null}
            </td>
        );
    });

    // Split into weeks
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
        rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
    }

    return (
        <table style={{ borderCollapse: "separate", borderSpacing: 4, margin: "0 auto" }}>
            <thead>
                <tr>
                    <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
