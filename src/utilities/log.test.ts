import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { transformLogData } from './log'

describe('transformLogData', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-19T04:35:00.000Z'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should transform log data correctly', () => {
    const logData = [
      '11:35:23,scheduled task 032, START,37980',
      '11:35:56,scheduled task 032, END,37980',
    ]

    const result = transformLogData(logData)

    expect(result).toEqual([
      {
        description: 'scheduled task 032',
        duration: 33,
        end: new Date('2025-01-19T04:35:56.000Z'),
        endTime: '11:35:56',
        index: 0,
        pid: '37980',
        start: new Date('2025-01-19T04:35:23.000Z'),
        startTime: '11:35:23',
        status: 'complete',
      },
    ])
  })

  it('should handle incomplete logs', () => {
    const logData = [
      '11:35:23,scheduled task 032, START,37980',
      '11:35:56,scheduled task 032, END,37980',
      '11:35:56,scheduled task 032, START,999999',
    ]

    const result = transformLogData(logData)

    expect(result).toEqual([
      {
        description: 'scheduled task 032',
        duration: 33,
        end: new Date('2025-01-19T04:35:56.000Z'),
        endTime: '11:35:56',
        index: 0,
        pid: '37980',
        start: new Date('2025-01-19T04:35:23.000Z'),
        startTime: '11:35:23',
        status: 'complete',
      },
      {
        description: 'scheduled task 032',
        duration: NaN,
        index: 2,
        pid: '999999',
        start: new Date('2025-01-19T04:35:56.000Z'),
        startTime: '11:35:56',
        status: 'incomplete',
      },
    ])
  })

  it('should handle logs when field is missing', () => {
    const logData = [
      '11:35:23,scheduled task 032, START',
      '11:35:56,scheduled task 032, END',
    ]

    const result = transformLogData(logData)

    expect(result).toEqual([])
  })
})
