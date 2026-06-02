// MonthCalendar.js
import React from "react";
import Mood from "./Mood";

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
        cells.push(<td key={"pad-" + i} className="month-calendar-pad"></td>);
    }

    days.forEach(day => {
        const dateStr = day.toISOString().slice(0, 10);
        const entry = entryMap[dateStr];
        const moodClass = entry?.mood ? `mood-bg-${entry.mood}` : "mood-bg-empty";
        cells.push(
            <td key={dateStr} className={`month-calendar-cell ${moodClass}`}>
                <div className="month-calendar-day-number">{day.getDate()}</div>
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
        <table className="month-calendar-table">
            <thead>
                <tr>
                    <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
