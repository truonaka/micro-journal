import { useCalendarDataQuery } from '../api'
import MonthCalendar from '../components/MonthCalendar'
import Mood from '../components/Mood'

export default function Calendar() {
  const calendarQuery = useCalendarDataQuery()
  const entries = calendarQuery.data?.entries || []
  const stats = calendarQuery.data?.stats || {}

  // Calculate the most common mood
  let mostCommon = null
  if (stats && Object.keys(stats).length > 0) {
    mostCommon = Object.entries(stats).sort((a, b) => b[1] - a[1])[0][0]
  }

  return (
    <div className="calendar-page">
      <h2>Calendar</h2>
      {calendarQuery.isPending && <div>Loading calendar...</div>}
      {!calendarQuery.isPending && entries.length === 0 && (
        <div>No entries yet for this month.</div>
      )}
      {!calendarQuery.isPending && (
        <>
          <MonthCalendar entries={entries} />
          <div className="calendar-section">
            <b>Legend:</b>{' '}
            {['great', 'good', 'okay', 'rough', 'bad'].map((m) => (
              <Mood key={m} mood={m} withText />
            ))}
          </div>
          <div className="calendar-section">
            <b>Most common mood (all time):</b>{' '}
            {mostCommon ? <Mood mood={mostCommon} withText /> : '—'}
          </div>
        </>
      )}
    </div>
  )
}
