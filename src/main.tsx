if (typeof window !== 'undefined') {
  (window as any).global = window;
  (window as any).process = { env: {} };
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import 'react-grid-layout/css/styles.css'
import { TooltipProvider } from '@/components/ui/tooltip'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TooltipProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TooltipProvider>
  </React.StrictMode>,
)
