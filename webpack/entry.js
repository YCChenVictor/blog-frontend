import { createRoot } from 'react-dom/client'
import SidebarLayout from './components/Sidebar.jsx';
import Category from './components/Category.jsx'
import NodeGraph from './components/NodeGraph.jsx'

const sidebar = document.getElementById('sidebar')
const category = document.getElementById('category')
const nodeGraph = document.getElementById('node-graph')

if (sidebar !== null) {
  createRoot(sidebar).render(
    <SidebarLayout />
  )
}

if (category !== null) {
  createRoot(category).render(
    <Category />
  )
}

if (nodeGraph !== null) {
  createRoot(nodeGraph).render(
    <NodeGraph />
  )
}
