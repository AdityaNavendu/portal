import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource-variable/geist'
import './styles/dark-theme.css'
import { Toaster } from 'sonner'
import { AppProvider } from './context/AppContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
      <Toaster/>
    </AppProvider>
  </React.StrictMode>,
)