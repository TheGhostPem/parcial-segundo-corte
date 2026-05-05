/**
 * @fileoverview Punto de entrada principal de la aplicación Frontend (React).
 * Renderiza el componente raíz <App /> dentro del elemento con id 'app' en el DOM.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
