import { memo } from 'react'
import { LogData } from '../types/log'

interface LogProcessorProps {
  logData: LogData[]
}

const LogProcessor: React.FC<LogProcessorProps> = ({ logData }) => {
  return (
    <div className="w-full text-black bg-gray-200 p-4 rounded overflow-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th>PID</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration (seconds)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((job, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  job.status === 'ERROR'
                    ? '#ffcccc'
                    : job.status === 'WARNING'
                      ? '#fff3cd'
                      : 'white',
              }}
            >
              <td>{job.pid}</td>
              <td>{job.description}</td>
              <td>{job.startTime}</td>
              <td>{job.endTime}</td>
              <td>{job.duration}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(LogProcessor)
