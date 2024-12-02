// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainContextProvider } from './contexts/MainContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <MainContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MainContextProvider>

  ,
)
