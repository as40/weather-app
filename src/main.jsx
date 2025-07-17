import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './appContext/ThemeContext.jsx'
import { WeatherProvider } from './appContext/WeatherContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <WeatherProvider>
       <App />
      </WeatherProvider>
    </ThemeProvider>
  </StrictMode>,
)
