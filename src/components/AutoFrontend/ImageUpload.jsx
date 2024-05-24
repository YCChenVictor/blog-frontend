import React, { useState } from 'react'
// import imageCompression from 'browser-image-compression'

function ImageUpload() {
  const [imageFile, setImageFile] = useState(null)
  const [compressedImage, setCompressedImage] = useState(null)
  const [compressedFileBase64Url, setCompressedFileBase64Url] = useState(null)
  const [message, setMessage] = useState('')

  async function handleUpload() {
    if (!imageFile) {
      setMessage('No file selected')
      return
    }

    setMessage('Uploading...')

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 10, // affect the size of base64Url
      useWebWorker: true,
    }

    try {
      const compressedFile = await imageCompression(imageFile, options)
      setCompressedImage(compressedFile)
      const base64url = await base64Url(compressedFile)
      setCompressedFileBase64Url(base64url)
      // compress another time and also show it on frontend
    } catch (error) {
      console.error('Error compressing image:', error)
    }
  }

  async function base64Url(file) {
    const compressedBase64Url = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

    console.log(compressedBase64Url.length)
    console.log(compressedBase64Url)

    return(compressedBase64Url)
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
      <div>Compressed File Base64</div>
      <div>{compressedFileBase64Url}</div>
    </div>
  )
}

export default ImageUpload
