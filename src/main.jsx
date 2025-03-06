import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {  RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { Router } from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider  router={Router} />
<ToastContainer />
  </StrictMode>,
)
