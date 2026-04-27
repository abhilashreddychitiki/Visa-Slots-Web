import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injectSpeedInsights } from '@vercel/speed-insights'
import App from './App.tsx'
import './index.css'

// Initialize Vercel Speed Insights
injectSpeedInsights()

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // Smart client throttling: refetch on focus
      staleTime: 1000 * 15, // Cache valid for 15s by default
      retry: 2,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
