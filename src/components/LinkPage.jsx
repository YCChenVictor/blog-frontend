import React from 'react'
import nodeGraph from '../data/software/nodeGraph.json'

const LinkPage = ({articleUrl}) => {
  debugger
  const nodes = nodeGraph.nodes
  const links = nodeGraph.links
  const pageNodeId = nodes.find((node) => {return node.name === `/blog/${articleUrl}`}).id
  const source = links.find((link) => {return link.target === pageNodeId}).source
  return (
    <div className="px-4">
      {source}
    </div>
  )  
}
export default LinkPage
