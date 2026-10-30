type View = 'landing' | 'learner' | 'admin' | 'author'

const IconHome = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
)

const IconChart = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
)

const IconPen = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
  </svg>
)

const IconLogout = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
  </svg>
)

export default function Sidebar({ view, user, onNavigate }: { view: View; user: { name: string; email: string; role?: 'learner' | 'admin' | 'author' } | null; onNavigate: (v: View) => void }) {
  const displayName = user?.name || 'Guest Learner'
  const initials = displayName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: 220,
      background: '#0E1117', borderRight: '1px solid #1E2D40',
      display: 'flex', flexDirection: 'column', padding: '20px 12px', zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px', marginBottom: 32 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#E2E8F0' }}>SkillShift</span>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div className="section-label" style={{ padding: '0 12px', marginBottom: 6 }}>Portal</div>
        {user?.role === 'learner' && (
          <button className={`nav-item ${view === 'learner' ? 'active' : ''}`} onClick={() => onNavigate('learner')}>
            <IconHome /> Learner Hub
          </button>
        )}
        {user?.role === 'admin' && (
          <button className={`nav-item ${view === 'admin' ? 'active' : ''}`} onClick={() => onNavigate('admin')}>
            <IconChart /> Admin Analytics
          </button>
        )}
        {user?.role === 'author' && (
          <button className={`nav-item ${view === 'author' ? 'active' : ''}`} onClick={() => onNavigate('author')}>
            <IconPen /> Author Studio
          </button>
        )}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{
          background: '#151B26', border: '1px solid #1E2D40', borderRadius: 8,
          padding: '12px', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: 'white',
            }}>{initials}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{displayName}</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>{user ? `${user.role === 'admin' ? 'Admin / Manager' : user.role === 'author' ? 'Content Author' : 'Learner'} · ${user.email}` : 'Learner · L4'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#F59E0B' }}>🔥 14-day streak</span>
          </div>
        </div>
        <button className="nav-item" onClick={() => onNavigate('landing')}>
          <IconLogout /> Back to Landing
        </button>
      </div>
    </aside>
  )
}
