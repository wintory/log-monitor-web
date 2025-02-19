export const WARNING_TIME = 5 * 60 // 5 minutes
export const ERROR_TIME = 10 * 60 // 10 minutes

export enum LogAction {
  START = 'start',
  END = 'end',
}

export enum LogType {
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
  WARNING = 'warning',
  ERROR = 'error',
}
