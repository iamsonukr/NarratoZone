import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>

  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </StoreContextProvider>
)
