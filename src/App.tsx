import { useState } from 'react'
import LandingPage from './components/LandingPage'
import AuthPage, { getSavedSession, signOut } from './components/AuthPage'
import LearnerDashboard from './components/LearnerDashboard'
import AdminDashboard from './components/AdminDashboard'
import AuthorStudio from './components/AuthorStudio'
import Sidebar from './components/Sidebar'

type View = 'landing' | 'auth' | 'learner' | 'admin' | 'author'

export default function App() {
  const [view, setView] = useState<View>('landing')
  const [user, setUser] = useState(getSavedSession)

  function navigate(next: View) {
    const requiredRole = next === 'learner' ? 'learner' : next === 'admin' ? 'admin' : next === 'author' ? 'author' : null
    if (requiredRole && user?.role !== requiredRole) {
      setView('auth')
      return
    }
    setView(next)
  }

  if (view === 'landing') {
    return <LandingPage onEnter={navigate} onSignIn={() => setView('auth')} user={user} />
  }

  if (view === 'auth') {
    return <AuthPage onBack={() => setView('landing')} onAuthenticated={(authenticatedUser) => { setUser(authenticatedUser); setView(authenticatedUser.role === 'admin' ? 'admin' : authenticatedUser.role === 'author' ? 'author' : 'learner') }} />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080A0F' }}>
      <Sidebar view={view} user={user} onNavigate={(next) => {
        if (next === 'landing') {
          signOut()
          setUser(null)
          setView('landing')
          return
        }
        navigate(next)
      }} />
      <main style={{ flex: 1, overflow: 'auto', marginLeft: 220 }}>
        {view === 'learner' && <LearnerDashboard />}
        {view === 'admin' && <AdminDashboard />}
        {view === 'author' && <AuthorStudio />}
      </main>
    </div>
  )
}
