import classNames from 'classnames'
import { FC, memo } from 'react'
import { LogType } from '../constants/log'
import { LogData } from '../types/log'

interface LogDetailProps {
  logData: LogData[]
}

const LogDetail: FC<LogDetailProps> = ({ logData }) => {
  return (
    <div className="w-full text-black bg-gray-200 p-4 rounded overflow-auto">
      <table className="w-full h-full overflow-auto">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-2">PID</th>
            <th className="p-2">Description</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Duration (seconds)</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((log) => (
            <tr key={log.pid} className="border-b border-gray-300">
              <td className="p-2">{log.pid || '--'}</td>
              <td className="p-2">{log.description || '--'}</td>
              <td className="p-2">{log.startTime || '--'}</td>
              <td className="p-2">{log.endTime || '--'}</td>
              <td className="p-2">{log.duration || '--'}</td>
              <td
                className={classNames('p-2', {
                  'text-error': [LogType.ERROR, LogType.INCOMPLETE].includes(
                    log.status
                  ),
                  'text-green-700': log.status === LogType.COMPLETE,
                  'text-warning': log.status === LogType.WARNING,
                })}
              >
                {log.status || '--'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {logData.length === 0 && (
        <p className="text-center p-4">No log available</p>
      )}
    </div>
  )
}

export default memo(LogDetail)
