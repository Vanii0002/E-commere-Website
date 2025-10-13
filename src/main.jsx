import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Api from './contenst/api.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>  
 <Api> 
    <App />
</Api>
 </BrowserRouter> 
)
