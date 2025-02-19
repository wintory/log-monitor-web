import './App.css'
import FileUploader from './components/FileUpload'
import LogProcessor from './components/LogDetail'
import useFileUpload from './hooks/useFileUpload'
import useLogProcessing from './hooks/useLogProcessing'

const App = () => {
  const { results, logData, setLogData } = useLogProcessing()
  const { handleFileChange, fileName } = useFileUpload({ onload: setLogData })

  return (
    <div className="h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] max-w-[1260px] overflow-hidden text-center">
      <span className="text-3xl font-bold underline pb-4">Log Monitor App</span>

      <div className="p-4 w-full flex-col">
        <div>
          <FileUploader
            handleFileChange={handleFileChange}
            fileName={fileName}
          />
        </div>
        {logData && (
          <>
            <div className="divider" />
            <div>
              <LogProcessor logData={results} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
