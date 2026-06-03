import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Today from './Today'

const mockUseTodayEntryQuery = jest.fn()
const mockUseSaveEntryMutation = jest.fn()

jest.mock('../api', () => ({
  useTodayEntryQuery: (...args) => mockUseTodayEntryQuery(...args),
  useSaveEntryMutation: (...args) => mockUseSaveEntryMutation(...args)
}))

describe('Today page', () => {
  beforeEach(() => {
    mockUseTodayEntryQuery.mockReset()
    mockUseSaveEntryMutation.mockReset()
  })

  test('shows loading state while entry is pending', () => {
    mockUseTodayEntryQuery.mockReturnValue({ isPending: true, data: null })
    mockUseSaveEntryMutation.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
      error: null
    })

    render(<Today />)

    expect(screen.getByText("Loading today's entry...")).toBeTruthy()
  })

  test('renders existing entry data in textarea', () => {
    mockUseTodayEntryQuery.mockReturnValue({
      isPending: false,
      data: { content: 'Already saved', mood: 'good' }
    })
    mockUseSaveEntryMutation.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
      error: null
    })

    render(<Today />)

    const textarea = screen.getByRole('textbox')
    expect(textarea.value).toBe('Already saved')

    const goodMoodButton = screen.getByRole('button', { name: /good/i })
    expect(goodMoodButton.className).toContain('selected')
  })

  test('saves updated entry and shows success message', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({ ok: true })
    mockUseTodayEntryQuery.mockReturnValue({
      isPending: false,
      data: { content: 'Existing content', mood: 'good' }
    })
    mockUseSaveEntryMutation.mockReturnValue({
      mutateAsync,
      isPending: false,
      error: null
    })

    render(<Today />)

    fireEvent.click(screen.getByRole('button', { name: /bad/i }))

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    const expectedDate = new Date().toISOString().slice(0, 10)
    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledTimes(1)
      expect(mutateAsync).toHaveBeenCalledWith({
        date: expectedDate,
        content: 'Existing content',
        mood: 'bad'
      })
    })
  })

  test('shows form and field errors from mutation', () => {
    mockUseTodayEntryQuery.mockReturnValue({ isPending: false, data: null })
    mockUseSaveEntryMutation.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
      error: {
        isAppError: true,
        message: 'Please review your input.',
        fieldErrors: {
          content: 'Content too long',
          mood: 'Mood is required'
        }
      }
    })

    render(<Today />)

    expect(screen.getByText('Content too long')).toBeTruthy()
    expect(screen.getByText('Mood is required')).toBeTruthy()
    expect(screen.queryByText('Please review your input.')).toBeNull()
  })
})
