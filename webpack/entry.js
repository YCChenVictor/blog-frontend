import { createRoot } from 'react-dom/client'
import Hello from './components/Hello.jsx';

const App = () => {
  console.log('aaaaaaaa')
  return (
    <Hello />
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
