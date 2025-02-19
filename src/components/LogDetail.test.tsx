import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LogType } from '../constants/log'
import { LogData } from '../types/log'
import LogDetail from './LogDetail'

describe('LogDetail', () => {
  const mockedLogData: LogData[] = [
    {
      pid: '1234',
      index: 0,
      description: 'Test log 1',
      startTime: '2023-01-01T00:00:00Z',
      endTime: '2023-01-01T00:01:00Z',
      duration: 60,
      status: LogType.COMPLETE,
    },
    {
      pid: '5678',
      index: 1,
      description: 'Test log 2',
      startTime: '2023-01-01T01:00:00Z',
      endTime: '2023-01-01T01:02:00Z',
      duration: 120,
      status: LogType.ERROR,
    },
  ]

  it('should renders if exists', () => {
    const { getByText } = render(<LogDetail logData={mockedLogData} />)

    expect(getByText('PID')).toBeInTheDocument()
  })

  it('displays log details correctly', () => {
    const { getByText } = render(<LogDetail logData={mockedLogData} />)
    expect(getByText('1234')).toBeInTheDocument()
    expect(getByText('Test log 1')).toBeInTheDocument()
    expect(getByText('2023-01-01T00:00:00Z')).toBeInTheDocument()
    expect(getByText('2023-01-01T00:01:00Z')).toBeInTheDocument()
    expect(getByText('60')).toBeInTheDocument()
    expect(getByText(LogType.COMPLETE)).toBeInTheDocument()

    expect(getByText('5678')).toBeInTheDocument()
    expect(getByText('Test log 2')).toBeInTheDocument()
    expect(getByText('2023-01-01T01:00:00Z')).toBeInTheDocument()
    expect(getByText('2023-01-01T01:02:00Z')).toBeInTheDocument()
    expect(getByText('120')).toBeInTheDocument()
    expect(getByText(LogType.ERROR)).toBeInTheDocument()
  })

  it('displays "No log available" when logData empty', () => {
    const { getByText } = render(<LogDetail logData={[]} />)

    expect(getByText('No log available')).toBeInTheDocument()
  })
})
