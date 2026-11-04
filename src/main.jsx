import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource-variable/dm-sans'
import './index.css'
import './resume-atlas.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
