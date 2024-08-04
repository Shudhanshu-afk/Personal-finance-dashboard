import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BankContextProvider } from './contexts/Bankcontext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BankContextProvider>
      <App />

    </BankContextProvider>

  </React.StrictMode>,
)
