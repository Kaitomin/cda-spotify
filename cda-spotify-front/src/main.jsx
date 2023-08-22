import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hook/useAuth.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
