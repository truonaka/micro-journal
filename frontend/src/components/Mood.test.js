import React from 'react'
import { render, screen } from '@testing-library/react'
import Mood from './Mood'

describe('Mood', () => {
  test('renders mapped mood emoji and class', () => {
    render(<Mood mood="good" />)

    const badge = screen.getByTitle('good')
    expect(badge).toBeTruthy()
    expect(badge.className).toContain('mood-good')
    expect(screen.getByText('🙂')).toBeTruthy()
    expect(screen.queryByText('good')).toBeNull()
  })

  test('renders mood text when withText is true', () => {
    render(<Mood mood="great" withText />)

    expect(screen.getByText('great')).toBeTruthy()
  })

  test('renders fallback for unknown mood', () => {
    render(<Mood mood="unknown-mood" />)

    const badge = screen.getByTitle('unknown-mood')
    expect(badge.className).toContain('mood-unknown')
    expect(screen.getByText('❓')).toBeTruthy()
  })
})
