import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import { AuthProvider } from './hook/useAuth.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <>
      {`${import.meta.env.VITE_PROFILE}` === 'DEVELOPMENT' && (
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      )}
      
      {`${import.meta.env.VITE_PROFILE}` === 'PRODUCTION' && (
        <HashRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </HashRouter>
      )}
    </>
      
  // </React.StrictMode>
)
