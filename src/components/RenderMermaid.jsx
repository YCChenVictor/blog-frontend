import React, {useRef, useState, useEffect} from 'react'
import mermaid from 'mermaid'

const RenderMermaid = (props) => {
  const markId = useRef(`mark${Math.floor((Math.random() * 100000) + 1)}`)
  const [svg, setSvg] = useState('')
  useEffect(() => {
    const renderMermaid = async () => {
      const svg = await mermaid.render(markId.current, props.children[0])
      setSvg(svg.svg)
    }
    renderMermaid()
  }, [])
  return (
    <div dangerouslySetInnerHTML={{ __html: svg }}>
    </div>
  )
}

export default RenderMermaid
