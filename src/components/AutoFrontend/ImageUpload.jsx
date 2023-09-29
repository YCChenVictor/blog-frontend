import React, { useState } from 'react'
import imageCompression from 'browser-image-compression'
import axios from 'axios'

function ImageUpload() {
  const [imageFile, setImageFile] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [message, setMessage] = useState('')

  async function handleUpload() {
    if (!imageFile) {
      setMessage('No file selected')
      return
    }

    setMessage('Uploading...')

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    }

    try {
      const compressedFile = await imageCompression(imageFile, options)
      setCompressedImage(compressedFile)
    } catch (error) {
      console.error('Error compressing image:', error)
    }
  }

  // check whether the base64 of compressed file is smaller than the uncompressed file
  // If yes, then I can post the compressed one to backend 
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImageFile(e.target.files[0])
        }}
      />
      <button onClick={handleUpload}>Upload</button>

      {message && <span>{message}</span>}
      {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Uncompressed" />}
      {compressedImage && <img src={URL.createObjectURL(compressedImage)} alt="Compressed" />}
    </div>
  )
}

export default ImageUpload
