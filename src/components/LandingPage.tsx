type View = 'landing' | 'learner' | 'admin' | 'author'

const features = [
  {
    icon: '⚡',
    title: 'Adaptive Micro-Learning',
    desc: '5-minute daily modules powered by spaced repetition and AI that adjusts to your exact skill gaps.',
    accent: '#6366F1',
  },
  {
    icon: '🧠',
    title: 'AI Skill Diagnostics',
    desc: 'Baseline assessment maps your current proficiency to your target role and generates a prioritized learning path.',
    accent: '#06B6D4',
  },
  {
    icon: '🏆',
    title: 'Dynamic Skill Passport',
    desc: 'Verifiable digital credentials, earned badges, and a public portfolio that moves with you across organizations.',
    accent: '#10B981',
  },
  {
    icon: '📊',
    title: 'Enterprise Analytics',
    desc: 'Real-time ROI dashboards track competency velocity, engagement rates, and team-wide skill closure.',
    accent: '#8B5CF6',
  },
  {
    icon: '✏️',
    title: 'Authoring Studio',
    desc: 'Drag-and-drop micro-content builder with AI-assisted quiz generation and version-controlled modules.',
    accent: '#F59E0B',
  },
  {
    icon: '🔥',
    title: 'Gamification Engine',
    desc: 'XP streaks, leaderboards, micro-bounties, and skill challenges that turn upskilling into daily habit.',
    accent: '#F43F5E',
  },
]

const steps = [
  { step: '01', label: 'Diagnostic', desc: '10-min adaptive baseline quiz maps where you are today.' },
  { step: '02', label: 'Path Generation', desc: 'AI curates a prioritized micro-learning playlist to close your gaps.' },
  { step: '03', label: 'Daily Engagement', desc: 'Push reminders, 5-min modules, and micro-assessments every day.' },
  { step: '04', label: 'Adaptive Loop', desc: 'Pass → unlock advanced content. Fail → targeted remedial lesson inserted.' },
  { step: '05', label: 'Skill Passport', desc: 'Earn verifiable credentials and watch your competency index rise.' },
]

const stats = [
  { value: '94%', label: 'Learner retention rate' },
  { value: '3.2×', label: 'Faster skill acquisition' },
  { value: '0', label: 'Enterprise clients' },
  { value: '0', label: 'Active learners' },
]

export default function LandingPage({ onEnter, onSignIn, user }: { onEnter: (v: View) => void; onSignIn: () => void; user: { name: string } | null }) {
  return (
    <div style={{ background: '#080A0F', color: '#E2E8F0', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(8, 10, 15, 0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1E2D40',
        padding: '0 40px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#E2E8F0' }}>SkillShift</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn-ghost" style={{ padding: '7px 16px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', color: '#CBD5E1' }} onClick={onSignIn}>Sign in</button>
          <button className="btn-primary" style={{ padding: '7px 16px' }} onClick={() => user ? onEnter('learner') : onSignIn()}>{user ? 'My account' : 'Log in'}</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid-bg" style={{ padding: '100px 40px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 600,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div className="badge" style={{ background: '#1C2538', border: '1px solid #2A3F5C', color: '#06B6D4', marginBottom: 24, display: 'inline-flex' }}>
            ⚡ AI-Powered Adaptive Learning Platform
          </div>
          <h1 style={{
            fontFamily: 'Outfit', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800,
            lineHeight: 1.05, marginBottom: 24, color: '#F1F5F9',
            maxWidth: 800, margin: '0 auto 24px',
          }}>
            Close the skills gap.<br />
            <span style={{ color: '#6366F1' }}>Shift faster.</span>
          </h1>
          <p style={{
            fontSize: 18, color: '#94A3B8', maxWidth: 560, margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            SkillShift delivers bite-sized adaptive learning for enterprise teams — AI-curated paths, verifiable credentials, and real-time competency analytics.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }} onClick={() => onEnter('learner')}>
              Start Free Assessment →
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        borderTop: '1px solid #1E2D40', borderBottom: '1px solid #1E2D40',
        padding: '40px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
        background: '#0E1117',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: '24px 16px',
            borderRight: i < 3 ? '1px solid #1E2D40' : 'none',
          }}>
            <div className="stat-number" style={{ fontSize: 42, color: '#E2E8F0', marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#64748B' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Platform Capabilities</div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>
              Everything your team needs to upskill.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="card card-hover" style={{ padding: 28 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, marginBottom: 16,
                  background: `${f.accent}18`,
                  border: `1px solid ${f.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: 'Outfit', fontSize: 17, fontWeight: 600, color: '#E2E8F0', marginBottom: 8, margin: '0 0 8px' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: '#0E1117', borderTop: '1px solid #1E2D40', borderBottom: '1px solid #1E2D40', padding: '80px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>
              From diagnostic to credential.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', paddingBottom: i < steps.length - 1 ? 32 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: '#151B26', border: '1px solid #2A3F5C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono', fontSize: 12, color: '#6366F1', fontWeight: 500,
                    flexShrink: 0,
                  }}>{s.step}</div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: '#1E2D40', minHeight: 32, marginTop: 4 }} />
                  )}
                </div>
                <div style={{ paddingTop: 12 }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: 17, fontWeight: 600, color: '#E2E8F0', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Built For Every Stakeholder</div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>
              One platform, three views.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                role: 'Learner', icon: '🎯', color: '#6366F1',
                items: ['Daily micro-challenges', 'Spaced repetition queue', 'Peer study circles', 'Dynamic Skill Passport', 'XP streaks & badges'],
                cta: 'Enter Learner Hub', view: 'learner' as View,
              },
              {
                role: 'Admin / Manager', icon: '📈', color: '#06B6D4',
                items: ['Org hierarchy builder', 'Custom learning paths', 'Real-time ROI dashboard', 'Budget & license management', 'Predictive risk alerts'],
                cta: 'View Admin Dashboard', view: 'admin' as View,
              },
              {
                role: 'Content Author', icon: '✏️', color: '#10B981',
                items: ['Drag-and-drop authoring', 'AI quiz generation', 'Drop-off analytics', 'Version control', 'NLP content tagging'],
                cta: 'Open Author Studio', view: 'author' as View,
              },
            ].map((r, i) => (
              <div key={i} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, marginBottom: 20,
                  background: `${r.color}18`, border: `1px solid ${r.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{r.icon}</div>
                <div style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, color: '#E2E8F0', marginBottom: 16 }}>{r.role}</div>
                <ul style={{ margin: '0 0 24px', padding: 0, listStyle: 'none', flex: 1 }}>
                  {r.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, color: '#94A3B8' }}>
                      <span style={{ color: r.color, fontSize: 10 }}>●</span> {item}
                    </li>
                  ))}
                </ul>
                <button className="btn-ghost" style={{ width: '100%', textAlign: 'center' }} onClick={() => onEnter(r.view)}>
                  {r.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#0E1117', borderTop: '1px solid #1E2D40',
        padding: '80px 40px', textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: 42, fontWeight: 800, color: '#F1F5F9', marginBottom: 16 }}>
          Ready to shift?
        </h2>
        <p style={{ fontSize: 16, color: '#64748B', marginBottom: 36 }}>
          Start your free diagnostic assessment and get a personalized skill roadmap in under 10 minutes.
        </p>
        <button className="btn-primary" style={{ fontSize: 16, padding: '14px 36px' }} onClick={() => onEnter('learner')}>
          Take the Free Assessment →
        </button>
      </section>

      <footer style={{
        borderTop: '1px solid #1E2D40', padding: '24px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#334155' }}>SkillShift</span>
        <span style={{ fontSize: 12, color: '#334155', fontFamily: 'JetBrains Mono' }}>© 2026 SkillShift Inc. All rights reserved.</span>
      </footer>
    </div>
  )
}
