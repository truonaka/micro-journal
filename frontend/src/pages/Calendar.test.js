import React from 'react'
import { render, screen } from '@testing-library/react'
import Calendar from './Calendar'

const mockUseCalendarDataQuery = jest.fn()

jest.mock('../api', () => ({
  useCalendarDataQuery: (...args) => mockUseCalendarDataQuery(...args)
}))

jest.mock('../components/MonthCalendar', () => ({
  __esModule: true,
  default: ({ entries }) => (
    <div data-testid="month-calendar">MonthCalendar entries: {entries.length}</div>
  )
}))

describe('Calendar page', () => {
  beforeEach(() => {
    mockUseCalendarDataQuery.mockReset()
  })

  test('shows loading state', () => {
    mockUseCalendarDataQuery.mockReturnValue({ isPending: true, data: null })

    render(<Calendar />)

    expect(screen.getByText('Loading calendar...')).toBeTruthy()
  })

  test('shows empty state when there are no entries', () => {
    mockUseCalendarDataQuery.mockReturnValue({
      isPending: false,
      data: { entries: [], stats: {} }
    })

    render(<Calendar />)

    expect(screen.getByText('No entries yet for this month.')).toBeTruthy()
  })

  test('renders calendar, legend and most common mood', () => {
    mockUseCalendarDataQuery.mockReturnValue({
      isPending: false,
      data: {
        entries: [
          { id: 1, date: '2026-06-01', mood: 'good', content: 'A' },
          { id: 2, date: '2026-06-02', mood: 'good', content: 'B' },
          { id: 3, date: '2026-06-03', mood: 'bad', content: 'C' }
        ],
        stats: { good: 2, bad: 1 }
      }
    })

    render(<Calendar />)

    expect(screen.getByTestId('month-calendar').textContent).toContain('MonthCalendar entries: 3')
    expect(screen.getByText('Legend:')).toBeTruthy()
    expect(screen.getByText('Most common mood (all time):')).toBeTruthy()
    expect(screen.getAllByText('good').length).toBeGreaterThan(0)
  })
})
