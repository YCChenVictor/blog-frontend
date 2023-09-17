import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ImageUpload from './ImageUpload'

const RenderFrontend = () => {
  const [compiledResult ,setCompiledResult] = useState('')
  const url = `http://localhost:5000/auto-frontend`

  useEffect(() => {
    fetchCompiledResult()
  }, [])

  const fetchCompiledResult = async () => {
    try {
      const response = await axios.get(url)
      setCompiledResult(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ImageUpload />
      <div dangerouslySetInnerHTML={{ __html: compiledResult }} />
    </div>
  )
}

export default RenderFrontend
