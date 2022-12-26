import { createRoot } from 'react-dom/client'
import SidebarLayout from './components/Sidebar.jsx';
import Category from './components/Category.jsx'

const sidebar = document.getElementById('sidebar')
const category = document.getElementById('category')

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
