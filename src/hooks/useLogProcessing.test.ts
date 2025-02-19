import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'
import { LogData } from '../types/log'
import { transformLogData } from '../utilities/log'
import useLogProcessing from './useLogProcessing'

vi.mock('../utilities/log', () => ({
  transformLogData: vi.fn(),
}))

describe('useLogProcessing', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty results', () => {
    const { result } = renderHook(() => useLogProcessing())

    expect(result.current.results).toEqual([])
  })

  it('should return log data correctly', () => {
    const mockTransformedData: LogData[] = []
    const mockLogs =
      '11:35:23,scheduled task 032, START,37980\n11:35:56,scheduled task 032, END,37980'

    const { result } = renderHook(() => useLogProcessing())

    act(() => {
      result.current.setLogData(mockLogs)
    })

    expect(transformLogData).toHaveBeenCalledWith(mockLogs.split('\n'))
    expect(result.current.results).toEqual(mockTransformedData)
  })

  it('should return empty logData', () => {
    ;(transformLogData as Mock).mockReturnValue([])

    const { result } = renderHook(() => useLogProcessing())

    act(() => {
      result.current.setLogData('')
    })

    expect(transformLogData).toHaveBeenCalledWith([])
    expect(result.current.results).toEqual([])
  })
})
