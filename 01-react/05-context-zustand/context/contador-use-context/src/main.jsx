import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProveedorContador } from './context/proveedor-contador'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorContador>
      <App />
    </ProveedorContador>
  </StrictMode>,
)
