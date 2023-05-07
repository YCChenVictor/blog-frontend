import { createRoot } from 'react-dom/client';
import SidebarLayout from './components/SidebarLayout.jsx';
import BurgerSidebar from './components/BurgerSidebar.jsx';
import Category from './components/Category.jsx';
import NodeGraph from './components/NodeGraph.jsx';
import SearchBar from './components/SearchBar.jsx';
import WordCounts from './components/WordCounts.jsx';

const sidebar = document.getElementById('sidebar')
const burgerSidebar = document.getElementById('burger-sidebar')
const category = document.getElementById('category')
const nodeGraph = document.getElementById('node-graph')
const searchBar = document.getElementById('search-bar')
const wordCounts = document.getElementById('word-count')

if (sidebar !== null) {
  createRoot(sidebar).render(
    <SidebarLayout />
  )
}

if (burgerSidebar !== null) {
  createRoot(burgerSidebar).render(
    <BurgerSidebar />
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

if (searchBar !== null) {
  createRoot(searchBar).render(
    <SearchBar />
  )
}

if (wordCounts !== null) {
  createRoot(wordCounts).render(
    <WordCounts />
  )
}
