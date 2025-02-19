import { memo } from 'react'

interface FileUploadProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  fileName: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  handleFileChange,
  fileName,
}) => {
  return (
    <div className="w-full inline-flex items-center gap-4">
      <label htmlFor="file-upload" className="btn btn-primary rounded p-2">
        Upload File
      </label>
      <input
        className="hidden"
        id="file-upload"
        type="file"
        accept=".log"
        onChange={handleFileChange}
      />
      <p>{fileName ? `Selected file: ${fileName}` : 'No file selected'}</p>
    </div>
  )
}

export default memo(FileUpload)
