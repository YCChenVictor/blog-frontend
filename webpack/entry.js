import { createRoot } from 'react-dom/client'
import Sidebar from './components/Sidebar.jsx';

const App = () => {
  return (
    <Sidebar />
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
