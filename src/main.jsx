import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/marhey/arabic-600.css'
import '@fontsource/marhey/latin-600.css'
import '@fontsource/marhey/arabic-700.css'
import '@fontsource/marhey/latin-700.css'
import '@fontsource/baloo-bhaijaan-2/arabic-400.css'
import '@fontsource/baloo-bhaijaan-2/latin-400.css'
import '@fontsource/baloo-bhaijaan-2/arabic-600.css'
import '@fontsource/baloo-bhaijaan-2/latin-600.css'
import '@fontsource/baloo-bhaijaan-2/arabic-700.css'
import '@fontsource/baloo-bhaijaan-2/latin-700.css'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
