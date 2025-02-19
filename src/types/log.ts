import { LogType } from '../constants/log'

export type LogData = {
  pid: string
  index: number
  description: string
  start?: number
  startTime?: string
  end?: number
  endTime?: string
  duration?: number
  status: LogType
}
