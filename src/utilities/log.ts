import { differenceInSeconds, parse } from 'date-fns'
import { ERROR_TIME, LogType, WARNING_TIME } from '../constants/log'

// TODO: refactor this function to a small reusable function
export const transformLogData = (logData: string[]) => {
  let transformedLogData: {
    [key: string]: { [key: string]: string | number | Date }
  } = {}

  logData.forEach((log, index) => {
    const splittedLog = log.split(',')

    if (splittedLog.length < 4) return

    const trimmedLog = splittedLog.map((log) => log.trim())
    const [timestamp, description, action, pid] = trimmedLog
    const time = parse(timestamp, 'HH:mm:ss', new Date())

    if (!transformedLogData[pid]) {
      transformedLogData[pid] = { index, description }
    }

    if (action.toLowerCase() === 'start') {
      transformedLogData[pid].start = time
      transformedLogData[pid].startTime = timestamp
    } else if (action.toLowerCase() === 'end') {
      transformedLogData[pid].end = time
      transformedLogData[pid].endTime = timestamp
    }
  })

  const result = Object.keys(transformedLogData).map((pid) => {
    const job = transformedLogData[pid]
    let status = LogType.COMPLETE

    if (!job.start || !job.end) {
      status = LogType.INCOMPLETE
    }

    const duration = differenceInSeconds(job.end, job.start)

    if (duration > ERROR_TIME) {
      status = LogType.ERROR
    } else if (duration > WARNING_TIME) {
      status = LogType.WARNING
    }

    return {
      ...job,
      pid,
      duration,
      status,
    }
  })

  return result
}
