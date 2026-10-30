import { useEffect, useState } from 'react'
import { apiRequest } from '../api'

const skills = [
  { name: 'Python', level: 72, target: 90, color: '#6366F1' },
  { name: 'Machine Learning', level: 48, target: 80, color: '#06B6D4' },
  { name: 'Data Visualization', level: 61, target: 75, color: '#10B981' },
  { name: 'SQL & Databases', level: 83, target: 85, color: '#8B5CF6' },
  { name: 'Statistics', level: 35, target: 70, color: '#F59E0B' },
  { name: 'Cloud Deployment', level: 22, target: 65, color: '#F43F5E' },
]

const modules = [
  { id: 1, title: 'Gradient Descent Fundamentals', tag: 'ML', duration: '5 min', type: 'Video', xp: 40, due: 'Due today', urgent: true },
  { id: 2, title: 'Pandas DataFrame Ops — Review', tag: 'Python', duration: '3 min', type: 'Flashcard', xp: 20, due: 'Due in 2h', urgent: true },
  { id: 3, title: 'Statistical Inference: T-Tests', tag: 'Statistics', duration: '5 min', type: 'Quiz', xp: 50, due: 'Due tomorrow', urgent: false },
  { id: 4, title: 'Matplotlib & Seaborn Basics', tag: 'DataViz', duration: '6 min', type: 'Interactive', xp: 45, due: 'In 3 days', urgent: false },
  { id: 5, title: 'AWS S3 Fundamentals', tag: 'Cloud', duration: '5 min', type: 'Video', xp: 40, due: 'In 5 days', urgent: false },
]

const badges = [
  { name: 'Python Novice', icon: '🐍', earned: true },
  { name: 'SQL Master', icon: '🗃️', earned: true },
  { name: 'First Streak', icon: '🔥', earned: true },
  { name: 'Consistent Learner', icon: '📅', earned: true },
  { name: 'ML Pioneer', icon: '🤖', earned: false },
  { name: 'Data Wizard', icon: '🔮', earned: false },
]

const leaderboard = [
  { rank: 1, name: 'Priya M.', xp: 4820, streak: 31, dept: 'Data Science' },
  { rank: 2, name: 'Carlos R.', xp: 4615, streak: 28, dept: 'Engineering' },
  { rank: 3, name: 'Jordan S.', xp: 4210, streak: 14, dept: 'Analytics', isMe: true },
  { rank: 4, name: 'Aisha K.', xp: 3980, streak: 22, dept: 'Product' },
  { rank: 5, name: 'Sam T.', xp: 3745, streak: 10, dept: 'Engineering' },
]

const typeColor: Record<string, string> = {
  Video: '#6366F1',
  Flashcard: '#06B6D4',
  Quiz: '#F59E0B',
  Interactive: '#10B981',
}

export default function LearnerDashboard() {
  const [activeTab, setActiveTab] = useState<'queue' | 'passport' | 'leaderboard'>('queue')
  const [queueFilter, setQueueFilter] = useState<'all' | 'todo' | 'done'>('all')
  const [completedModules, setCompletedModules] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('skillshift.completedModules')
      return new Set<number>(saved ? JSON.parse(saved) : [])
    } catch {
      return new Set<number>()
    }
  })
  const [progressError, setProgressError] = useState('')

  useEffect(() => {
    apiRequest<{ completedModules: number[] }>('/api/learner/progress.php')
      .then(({ completedModules: ids }) => setCompletedModules(new Set(ids)))
      .catch(error => setProgressError(error instanceof Error ? error.message : 'Could not load saved progress.'))
  }, [])

  useEffect(() => {
    localStorage.setItem('skillshift.completedModules', JSON.stringify([...completedModules]))
  }, [completedModules])

  const totalXP = 4210 + modules.reduce((sum, module) => sum + (completedModules.has(module.id) ? module.xp : 0), 0)
  const level = 4
  const nextLevelXP = 4500
  const xpProgress = Math.min(100, Math.max(0, ((totalXP - 3800) / (nextLevelXP - 3800)) * 100))
  const visibleModules = modules.filter(module => queueFilter === 'all' || (queueFilter === 'done') === completedModules.has(module.id))

  async function completeModule(moduleId: number) {
    setProgressError('')
    setCompletedModules(previous => new Set([...previous, moduleId]))
    try {
      const result = await apiRequest<{ completedModules: number[] }>('/api/learner/progress.php', {
        method: 'PUT', body: JSON.stringify({ moduleId, completed: true }),
      })
      setCompletedModules(new Set(result.completedModules))
    } catch (error) {
      setCompletedModules(previous => { const next = new Set(previous); next.delete(moduleId); return next })
      setProgressError(error instanceof Error ? error.message : 'Could not save your progress.')
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="section-label" style={{ marginBottom: 8 }}>Learner Hub</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: '#F1F5F9', margin: '0 0 4px' }}>
              Good morning, Jordan.
            </h1>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              You have <span style={{ color: '#F59E0B', fontWeight: 600 }}>{modules.filter(module => module.urgent && !completedModules.has(module.id)).length} modules</span> due soon. Keep the streak alive.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="card" style={{ padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 2 }}>🔥</div>
              <div className="stat-number" style={{ fontSize: 20, color: '#F59E0B' }}>14</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>day streak</div>
            </div>
            <div className="card" style={{ padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 2 }}>⚡</div>
              <div className="stat-number" style={{ fontSize: 20, color: '#6366F1' }}>{totalXP.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>total XP</div>
            </div>
            <div className="card" style={{ padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 2 }}>🏅</div>
              <div className="stat-number" style={{ fontSize: 20, color: '#10B981' }}>{badges.filter(b => b.earned).length}</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>badges earned</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Main column */}
        <div style={{ minWidth: 0 }}>
          {/* XP Progress */}
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>Level {level} — Data Analyst</span>
                <span style={{ fontSize: 12, color: '#64748B', marginLeft: 10 }}>→ Level {level + 1}: Senior Analyst</span>
              </div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#6366F1' }}>
                {Math.min(totalXP, nextLevelXP).toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </span>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-fill" style={{ width: `${xpProgress}%`, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }} />
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>
              {totalXP >= nextLevelXP ? 'Level goal reached. Advanced ML modules unlocked!' : `${nextLevelXP - totalXP} XP to unlock advanced ML modules`}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #1E2D40', marginBottom: 20 }}>
            {(['queue', 'passport', 'leaderboard'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '10px 20px', fontSize: 13, fontWeight: 500,
                background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === tab ? '#E2E8F0' : '#64748B',
                borderBottom: activeTab === tab ? '2px solid #6366F1' : '2px solid transparent',
                marginBottom: -1, transition: 'color 0.15s',
                textTransform: 'capitalize',
              }}>
                {tab === 'queue' ? 'Learning Queue' : tab === 'passport' ? 'Skill Passport' : 'Leaderboard'}
              </button>
            ))}
          </div>

          {activeTab === 'queue' && (
            <>
              {progressError && <div role="alert" style={{ marginBottom: 12, padding: 12, borderRadius: 8, background: '#7F1D1D30', border: '1px solid #7F1D1D', color: '#FDA4AF', fontSize: 13 }}>{progressError}</div>}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>{completedModules.size} of {modules.length} modules completed</span>
                <div style={{ display: 'flex', gap: 6 }} aria-label="Filter learning queue">
                  {(['all', 'todo', 'done'] as const).map(filter => (
                    <button key={filter} onClick={() => setQueueFilter(filter)} aria-pressed={queueFilter === filter} style={{
                      border: `1px solid ${queueFilter === filter ? '#6366F1' : '#1E2D40'}`, borderRadius: 6,
                      padding: '6px 10px', background: queueFilter === filter ? '#1C2538' : 'transparent',
                      color: queueFilter === filter ? '#E2E8F0' : '#64748B', cursor: 'pointer', fontSize: 12,
                    }}>{filter === 'all' ? 'All' : filter === 'todo' ? 'To do' : 'Completed'}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {visibleModules.map(m => (
                <div key={m.id} className="card card-hover" style={{
                  padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  opacity: completedModules.has(m.id) ? 0.45 : 1,
                  transition: 'opacity 0.3s',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                    background: `${typeColor[m.type] ?? '#6366F1'}18`,
                    border: `1px solid ${typeColor[m.type] ?? '#6366F1'}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>
                    {m.type === 'Video' ? '▶' : m.type === 'Flashcard' ? '🃏' : m.type === 'Quiz' ? '📝' : '⚙️'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#E2E8F0', marginBottom: 4 }}>{m.title}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span className="tag">{m.tag}</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>{m.duration}</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>·</span>
                      <span style={{ fontSize: 12, color: m.urgent ? '#F59E0B' : '#64748B' }}>{m.due}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#6366F1' }}>+{m.xp} XP</span>
                    <button
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: 12 }}
                      onClick={() => completeModule(m.id)}
                      disabled={completedModules.has(m.id)}
                    >
                      {completedModules.has(m.id) ? '✓ Done' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
              {visibleModules.length === 0 && <div className="card" style={{ padding: 24, textAlign: 'center', color: '#64748B', fontSize: 13 }}>Nothing here yet. Choose another filter to see your modules.</div>}
              </div>
            </>
          )}

          {activeTab === 'passport' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {badges.map((b, i) => (
                  <div key={i} className="card" style={{
                    padding: '20px 16px', textAlign: 'center',
                    opacity: b.earned ? 1 : 0.4,
                    border: b.earned ? '1px solid #2A3F5C' : '1px solid #1E2D40',
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: b.earned ? '#E2E8F0' : '#64748B' }}>{b.name}</div>
                    {!b.earned && <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>Locked</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2D40' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#64748B' }}>TEAM RANKINGS · Q3 2026</span>
              </div>
              {leaderboard.map((r) => (
                <div key={r.rank} style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
                  borderBottom: '1px solid #1E2D40',
                  background: r.isMe ? '#1C2538' : 'transparent',
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 600,
                    color: r.rank === 1 ? '#F59E0B' : r.rank === 2 ? '#94A3B8' : r.rank === 3 ? '#B45309' : '#334155',
                    width: 24, textAlign: 'center',
                  }}>{r.rank}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: r.isMe ? 'linear-gradient(135deg, #8B5CF6, #6366F1)' : '#1C2538',
                    border: '1px solid #2A3F5C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#E2E8F0',
                  }}>{r.name.split(' ').map(n => n[0]).join('')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: r.isMe ? 700 : 500, color: '#E2E8F0' }}>
                      {r.name} {r.isMe && <span style={{ fontSize: 11, color: '#6366F1' }}>(you)</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{r.dept}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#6366F1', fontWeight: 600 }}>{r.xp.toLocaleString()} XP</div>
                    <div style={{ fontSize: 11, color: '#F59E0B' }}>🔥 {r.streak}d</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skill Matrix sidebar */}
        <div>
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: '#E2E8F0', marginBottom: 16 }}>
              Skill Matrix
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#CBD5E1' }}>{s.name}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: s.color }}>
                      {s.level}% <span style={{ color: '#334155' }}>/ {s.target}%</span>
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{ width: `${s.level}%`, background: s.color }} />
                  </div>
                  <div style={{ height: 2, background: 'transparent', position: 'relative', top: -2 }}>
                    <div style={{
                      position: 'absolute', left: `${s.target}%`, top: 0,
                      width: 1, height: 6, background: '#334155', marginTop: -2,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily challenge */}
          <div className="card" style={{
            padding: 24, background: 'linear-gradient(135deg, #0F1628, #121C30)',
            border: '1px solid #2A3F5C',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="section-label">Daily Challenge</div>
              <span className="badge" style={{ background: '#F59E0B18', border: '1px solid #F59E0B40', color: '#F59E0B' }}>+80 XP</span>
            </div>
            <div style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 600, color: '#E2E8F0', marginBottom: 8 }}>
              Neural Network Architecture Quiz
            </div>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, margin: '0 0 16px' }}>
              Test your understanding of feed-forward vs recurrent networks and backpropagation.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <span className="tag">ML</span>
              <span className="tag">5 questions</span>
              <span className="tag">~4 min</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Start Challenge →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
