import { useState } from 'react'
import { clearApiSession, saveApiSession, SESSION_KEY } from '../api'

type Role = 'learner' | 'admin' | 'author'
type Account = { name: string; email: string; password: string; role?: Role }
type AuthUser = Pick<Account, 'name' | 'email'> & { role: Role }

export function getSavedSession(): AuthUser | null {
  try {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    return user && typeof user.name === 'string' && typeof user.email === 'string'
      ? { ...user, role: user.role === 'admin' || user.role === 'author' ? user.role : 'learner' }
      : null
  } catch {
    return null
  }
}

export function signOut() {
  clearApiSession()
}

export default function AuthPage({ onAuthenticated, onBack }: {
  onAuthenticated: (user: AuthUser) => void
  onBack: () => void
}) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('learner')
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const normalizedEmail = email.trim().toLowerCase()
    try {
      const response = await fetch(mode === 'signup' ? '/api/auth/signup.php' : '/api/auth/login.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'signup'
          ? { name: name.trim() || normalizedEmail.split('@')[0], email: normalizedEmail, password, role }
          : { email: normalizedEmail, password, role }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to access your account.')
      saveApiSession(result.user)
      onAuthenticated(result.user)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not connect to SkillShift. Start the backend and try again.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #1E2D40',
    background: '#080A0F', color: '#E2E8F0', font: '14px Inter, sans-serif', outlineColor: '#6366F1',
  }

  return (
    <main className="grid-bg" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, color: '#E2E8F0' }}>
      <section className="card animate-slide-up" style={{ width: 'min(100%, 440px)', padding: 32 }}>
        <button type="button" className="btn-ghost" onClick={onBack} style={{ border: 0, padding: '4px 0', marginBottom: 22 }}>← Back to SkillShift</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #6366F1, #06B6D4)', display: 'grid', placeItems: 'center', fontSize: 20 }}>⚡</div>
          <span style={{ font: '700 20px Outfit, sans-serif' }}>SkillShift</span>
        </div>
        <div className="section-label" style={{ marginBottom: 8 }}>Account access</div>
        <h1 style={{ font: '700 30px Outfit, sans-serif', margin: '0 0 8px', color: '#F1F5F9' }}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#94A3B8', margin: '0 0 18px' }}>{mode === 'login' ? 'Choose your role and log in to continue.' : 'Choose your role and create your account.'}</p>
        <div role="group" aria-label="Choose account role" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginBottom: 20 }}>
          {(['learner', 'admin', 'author'] as Role[]).map((option) => <button key={option} type="button" onClick={() => { setRole(option); setError('') }} aria-pressed={role === option} className={role === option ? 'btn-primary' : 'btn-ghost'} style={{ padding: '10px 6px', fontSize: 12 }}>{option === 'admin' ? 'Admin / Manager' : option === 'author' ? 'Content Author' : 'Learner'}</button>)}
        </div>
        <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
          {mode === 'signup' && role === 'learner' && <label style={{ display: 'grid', gap: 7, color: '#CBD5E1', fontSize: 13, fontWeight: 500 }}>Full name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Jordan Smith" style={inputStyle} /></label>}
          <label style={{ display: 'grid', gap: 7, color: '#CBD5E1', fontSize: 13, fontWeight: 500 }}>Email address<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" style={inputStyle} /></label>
          <label style={{ display: 'grid', gap: 7, color: '#CBD5E1', fontSize: 13, fontWeight: 500 }}>Password<input required minLength={6} type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" style={inputStyle} /></label>
          {error && <div role="alert" style={{ color: '#FDA4AF', fontSize: 13, lineHeight: 1.5 }}>{error}</div>}
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: 13, marginTop: 2 }}>{mode === 'login' ? `Log in as ${role === 'admin' ? 'Admin / Manager' : role === 'author' ? 'Content Author' : 'Learner'}` : 'Create account'} →</button>
        </form>
        <p style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', margin: '22px 0 0' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }} style={{ padding: 0, border: 0, background: 'none', color: '#818CF8', font: '600 13px Inter, sans-serif', cursor: 'pointer' }}>{mode === 'login' ? 'Sign in' : 'Log in'}</button>
        </p>
      </section>
    </main>
  )
}
