import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App Component', () => {
  it('renders the title', () => {
    const { getByText } = render(<App />)

    expect(getByText('Log Monitor App')).toBeInTheDocument()
  })
})
