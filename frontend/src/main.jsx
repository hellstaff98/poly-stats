import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'

const initializeApp = async () => {
  // Инициализируем тему
  const savedTheme = localStorage.getItem('poly-stats-storage')
  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme)
      if (parsed?.state?.settings?.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    } catch (e) {
      console.error('Error parsing saved theme:', e)
    }
  }
  
  // Рендерим приложение
  render(<App />, document.getElementById('app'))
}

// Запускаем инициализацию
initializeApp().catch(console.error)