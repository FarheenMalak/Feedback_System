import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
