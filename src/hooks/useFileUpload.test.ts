import { act, renderHook } from '@testing-library/react'
import { ChangeEvent } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useFileUpload from './useFileUpload'

describe('useFileUpload', () => {
  const mockOnload = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return empty fileName', () => {
    const { result } = renderHook(() => useFileUpload({ onload: vi.fn() }))

    expect(result.current.fileName).toBe('')
  })

  it('should update fileName when file is selected', async () => {
    const { result } = renderHook(() => useFileUpload({ onload: mockOnload }))

    const file = new Blob(['Test\nTest'], { type: 'text/plain' })
    const event = {
      target: {
        files: [new File([file], 'test.log')],
      },
    } as unknown as ChangeEvent<HTMLInputElement>

    await act(async () => {
      result.current.handleFileChange(event)
    })

    expect(result.current.fileName).toBe('test.log')
  })

  it('should not call onload if no file selected', async () => {
    const mockOnload = vi.fn()
    const { result } = renderHook(() => useFileUpload({ onload: mockOnload }))

    const event = {
      target: {
        files: [],
      },
    } as unknown as ChangeEvent<HTMLInputElement>

    await act(async () => {
      result.current.handleFileChange(event)
    })

    expect(result.current.fileName).toBe('')
    expect(mockOnload).not.toHaveBeenCalled()
  })
})
