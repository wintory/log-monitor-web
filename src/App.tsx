import './App.css'
import FileUpload from './components/FileUpload'
import LogDetail from './components/LogDetail'
import useFileUpload from './hooks/useFileUpload'
import useLogProcessing from './hooks/useLogProcessing'

const App = () => {
  const { results, setLogData } = useLogProcessing()
  const { handleFileChange, fileName } = useFileUpload({ onload: setLogData })

  return (
    <div className="h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] max-w-[1260px] overflow-auto text-center">
      <span className="text-3xl font-bold underline pb-4">Log Monitor App</span>

      <div className="p-4 w-full flex-col">
        <div>
          <FileUpload handleFileChange={handleFileChange} fileName={fileName} />
        </div>
        {results && (
          <>
            <div className="divider" />
            <div>
              <LogDetail logData={results} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
