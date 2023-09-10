import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div dangerouslySetInnerHTML={{ __html: compiledResult }} />
  )
}

export default RenderFrontend
