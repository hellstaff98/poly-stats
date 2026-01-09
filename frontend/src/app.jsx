import { useEffect, useState } from 'preact/hooks'
import { useStore } from './store'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { DisciplinePage } from './pages/DisciplinePage'
import { Settings } from './pages/Settings'
import BottomNav from './components/BottomNav'
import './index.css'

export function App() {
  const { user, setOnlineStatus, loadCurrentUser } = useStore()
  const [currentPage, setCurrentPage] = useState('home')
  const [disciplineId, setDisciplineId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Загружаем данные пользователя при монтировании
    const initUser = async () => {
      try {
        await loadCurrentUser()
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    initUser()
  }, [loadCurrentUser])
  
  const navigate = (page, id = '') => {
    setCurrentPage(page)
    if (id) {
      setDisciplineId(id)
    }
    
    let path = '/'
    if (page === 'discipline' && id) {
      path = `/discipline/${id}`
    } else if (page !== 'home') {
      path = `/${page}`
    }
    
    window.history.pushState({}, '', path)
  }
  
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      
      if (path.includes('/discipline/')) {
        const id = path.split('/discipline/')[1]
        setCurrentPage('discipline')
        setDisciplineId(id)
      } else if (path === '/settings') {
        setCurrentPage('settings')
      } else if (path === '/login') {
        setCurrentPage('login')
      } else {
        setCurrentPage('home')
      }
    }
    
    window.addEventListener('popstate', handlePopState)
    
    const initialPath = window.location.pathname
    
    if (initialPath.includes('/discipline/')) {
      const id = initialPath.split('/discipline/')[1]
      setCurrentPage('discipline')
      setDisciplineId(id)
    } else if (initialPath === '/settings') {
      setCurrentPage('settings')
    } else if (initialPath === '/login') {
      setCurrentPage('login')
    }
    
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(err => console.log('Ошибка SW:', err))
    }
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])
  
  // Показываем загрузку
  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Загрузка...</p>
      </div>
    )
  }
  
  // Если пользователь не авторизован, показываем страницу логина
  if (!user) {
    return <Login navigate={navigate} />
  }
  
  const renderPage = () => {
    switch (currentPage) {
      case 'discipline':
        return disciplineId ? <DisciplinePage disciplineId={disciplineId} navigate={navigate} /> : <Home navigate={navigate} />
      case 'settings':
        return <Settings navigate={navigate} />
      default:
        return <Home navigate={navigate} />
    }
  }
  
  return (
    <div class="app">
      <div class="scrollable-content">
        {renderPage()}
      </div>
      {currentPage !== 'login' && (
        <div class="fixed-bottom">
          <BottomNav navigate={navigate} currentPage={currentPage} />
        </div>
      )}
    </div>
  )
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'var(--background)'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid var(--border)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },
  loadingText: {
    color: 'var(--text)',
    fontSize: '0.9rem'
  }
}

// Добавляем CSS для анимации
const style = document.createElement('style')
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
document.head.appendChild(style)