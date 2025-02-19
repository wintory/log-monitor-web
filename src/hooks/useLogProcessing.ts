import { useMemo, useState } from 'react'
import { LogData } from '../types/log'
import { transformLogData } from '../utilities/log'

const useLogProcessing = () => {
  const [logData, setLogData] = useState<string | ArrayBuffer>()

  const results = useMemo(() => {
    const logs = typeof logData === 'string' ? logData.trim().split('\n') : []
    const result = transformLogData(logs) as LogData[]

    return (result || []).sort((a, b) => a.index - b.index) // sort by input index
  }, [logData])

  return { results, setLogData }
}

export default useLogProcessing
