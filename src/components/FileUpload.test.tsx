import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FileUploader from './FileUpload'

describe('FileUploader', () => {
  const handleFileChange = vi.fn()

  it('should render if exists', () => {
    const { getByText } = render(
      <FileUploader handleFileChange={handleFileChange} fileName="" />
    )

    expect(getByText('Upload File')).toBeInTheDocument()
  })

  it('should display "No file selected" when no file selected', () => {
    const { getByText } = render(
      <FileUploader handleFileChange={handleFileChange} fileName="" />
    )

    expect(getByText('No file selected')).toBeInTheDocument()
  })

  it('should display the file name when file is selected', () => {
    const fileName = 'example.log'
    const { getByText } = render(
      <FileUploader handleFileChange={handleFileChange} fileName={fileName} />
    )

    expect(getByText(`Selected file: ${fileName}`)).toBeInTheDocument()
  })

  it('should call handleFileChange when a file is selected', () => {
    const { getByLabelText } = render(
      <FileUploader handleFileChange={handleFileChange} fileName="" />
    )

    const input = getByLabelText('Upload File')

    fireEvent.change(input, {
      target: { files: [new File([''], 'aaa.log', { type: 'text/log' })] },
    })

    expect(handleFileChange).toHaveBeenCalled()
  })
})
