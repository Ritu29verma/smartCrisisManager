import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadAccentFromStorage, loadThemeFromStorage } from "@/lib/themeUtils";
loadAccentFromStorage();
loadThemeFromStorage();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
