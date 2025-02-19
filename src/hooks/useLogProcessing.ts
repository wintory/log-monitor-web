import { useEffect, useState } from 'react'
import { ERROR_TIME, WARNING_TIME } from '../constants/log'

const useLogProcessing = () => {
  const [results, setResults] = useState([])
  const [logData, setLogData] = useState<string | ArrayBuffer>()

  const parseLogs = (data) => {
    const logs = data.trim().split('\n')
    const jobTracker = {}

    logs.forEach((line) => {
      const parts = line.split(',')
      if (parts.length < 4) return

      const [timestamp, description, action, pid] = parts.map((p) => p.trim())
      const [hh, mm, ss] = timestamp.split(':').map(Number)
      const timeInSeconds = hh * 3600 + mm * 60 + ss

      if (!jobTracker[pid]) jobTracker[pid] = { description }

      if (action.toLowerCase() === 'start') {
        jobTracker[pid].start = timeInSeconds
      } else if (action.toLowerCase() === 'end') {
        jobTracker[pid].end = timeInSeconds
      }
    })

    const report = Object.keys(jobTracker).map((pid) => {
      const job = jobTracker[pid]
      if (!job.start || !job.end) {
        return {
          pid,
          description: job.description,
          startTime: job.start,
          endTime: job.end,
          status: 'Incomplete',
          duration: '-',
        }
      }

      const duration = job.end - job.start
      let status = 'OK'

      if (duration > ERROR_TIME) status = 'Error'
      else if (duration > WARNING_TIME) status = 'Warning'

      return { pid, description: job.description, duration, status }
    })

    setResults(report)
  }

  useEffect(() => {
    if (logData) {
      parseLogs(logData)
    }
  }, [logData])

  return { results, parseLogs, logData, setLogData }
}

export default useLogProcessing
