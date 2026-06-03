import React from 'react'
import { render, screen } from '@testing-library/react'
import Entries from './Entries'

const mockUseEntriesQuery = jest.fn()

jest.mock('../api', () => ({
  useEntriesQuery: (...args) => mockUseEntriesQuery(...args)
}))

describe('Entries page', () => {
  beforeEach(() => {
    mockUseEntriesQuery.mockReset()
  })

  test('shows loading state', () => {
    mockUseEntriesQuery.mockReturnValue({ isPending: true, data: null })

    render(<Entries />)

    expect(screen.getByText('Loading entries...')).toBeTruthy()
  })

  test('shows empty state when no entries are available', () => {
    mockUseEntriesQuery.mockReturnValue({ isPending: false, data: [] })

    render(<Entries />)

    expect(screen.getByText('No entries yet.')).toBeTruthy()
  })

  test('renders entry rows when data exists', () => {
    mockUseEntriesQuery.mockReturnValue({
      isPending: false,
      data: [
        { id: 1, date: '2026-06-01', content: 'First entry', mood: 'good' },
        { id: 2, date: '2026-06-02', content: 'Second entry', mood: 'great' }
      ]
    })

    render(<Entries />)

    const rows = document.querySelectorAll('.entry-row')
    expect(rows.length).toBe(2)
    expect(screen.getByText('2026-06-01')).toBeTruthy()
    expect(document.body.textContent).toContain('First entry')
    expect(screen.getByText('2026-06-02')).toBeTruthy()
    expect(document.body.textContent).toContain('Second entry')
  })
})
