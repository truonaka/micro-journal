import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import AppErrorBoundary from './components/AppErrorBoundary'
import GlobalToast from './components/GlobalToast'
import { queryClient } from './lib/queryClient'
import './styles/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
      <GlobalToast />
    </QueryClientProvider>
  </React.StrictMode>
)
