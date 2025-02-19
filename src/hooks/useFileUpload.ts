import { useState } from 'react'

interface UseFileUploadProps {
  onload: (result: string | ArrayBuffer) => void
}

const useFileUpload = ({ onload }: UseFileUploadProps) => {
  const [fileName, setFileName] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      if (onload) reader.onload = (e) => onload(e.target?.result ?? '')
      reader.readAsText(file)
    }
  }

  return { handleFileChange, fileName }
}

export default useFileUpload
