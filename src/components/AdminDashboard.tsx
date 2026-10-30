import { useState } from 'react'

const departments = [
  { name: 'Data Science', members: 28, avgSkill: 71, active: 94, target: 85, velocity: '+4.2/wk' },
  { name: 'Engineering', members: 64, avgSkill: 68, active: 87, target: 80, velocity: '+3.8/wk' },
  { name: 'Product', members: 19, avgSkill: 54, active: 73, target: 70, velocity: '+2.1/wk' },
  { name: 'Analytics', members: 22, avgSkill: 76, active: 91, target: 85, velocity: '+5.1/wk' },
  { name: 'Operations', members: 31, avgSkill: 41, active: 62, target: 65, velocity: '+1.4/wk' },
]

const atRisk = [
  { name: 'Marcus J.', dept: 'Operations', lastActive: '12 days ago', progress: 22, risk: 'High' },
  { name: 'Taylor W.', dept: 'Product', lastActive: '7 days ago', progress: 38, risk: 'Medium' },
  { name: 'Riley B.', dept: 'Engineering', lastActive: '5 days ago', progress: 44, risk: 'Medium' },
]

const paths = [
  { name: 'ML Engineer Track', modules: 24, enrolled: 41, completion: 68 },
  { name: 'Data Governance Compliance', modules: 8, enrolled: 112, completion: 89 },
  { name: 'Cloud Architecture Basics', modules: 16, enrolled: 30, completion: 34 },
  { name: 'Python for Analytics', modules: 20, enrolled: 55, completion: 71 },
]

const kpis = [
  { label: 'Active Learners', value: '156', sub: 'of 164 licensed', delta: '+12', color: '#10B981' },
  { label: 'Avg Skill Velocity', value: '3.6', sub: 'pts/week', delta: '+0.4', color: '#6366F1' },
  { label: 'Competency Gap Closed', value: '47%', sub: 'org-wide', delta: '+6%', color: '#06B6D4' },
  { label: 'License Utilization', value: '95%', sub: '156 / 164 seats', delta: '', color: '#8B5CF6' },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const engagementData = [62, 68, 74, 71, 79, 84, 81, 88, 94]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'paths' | 'risk'>('overview')

  return (
    <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="section-label" style={{ marginBottom: 8 }}>Admin Analytics</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: '#F1F5F9', margin: '0 0 4px' }}>
              Acme Corp — Org Dashboard
            </h1>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              Real-time competency index · Updated 2 min ago
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }}>Export CSV</button>
            <button className="btn-primary" style={{ padding: '7px 14px', fontSize: 13 }}>Build Learning Path</button>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {kpis.map((k, i) => (
          <div key={i} className="card" style={{ padding: '20px 24px' }}>
            <div className="section-label" style={{ marginBottom: 10 }}>{k.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span className="stat-number" style={{ fontSize: 32, color: '#E2E8F0' }}>{k.value}</span>
              {k.delta && (
                <span style={{ fontSize: 12, color: k.color, fontFamily: 'JetBrains Mono' }}>{k.delta}</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{k.sub}</div>
            <div style={{ marginTop: 12, height: 3, borderRadius: 2, background: '#1C2538' }}>
              <div style={{ height: '100%', borderRadius: 2, background: k.color, width: '70%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #1E2D40', marginBottom: 24 }}>
        {(['overview', 'paths', 'risk'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '10px 20px', fontSize: 13, fontWeight: 500,
            background: 'none', border: 'none', cursor: 'pointer',
            color: activeTab === tab ? '#E2E8F0' : '#64748B',
            borderBottom: activeTab === tab ? '2px solid #6366F1' : '2px solid transparent',
            marginBottom: -1, transition: 'color 0.15s',
          }}>
            {tab === 'overview' ? 'Department Overview' : tab === 'paths' ? 'Learning Paths' : 'At-Risk Learners'}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            {/* Engagement sparkline */}
            <div className="card" style={{ padding: '24px', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>Engagement Rate Trend</div>
                <span className="badge" style={{ background: '#10B98118', border: '1px solid #10B98130', color: '#10B981' }}>↑ 32pp this year</span>
              </div>
              {/* Inline SVG bar chart */}
              <svg width="100%" height="120" style={{ overflow: 'visible' }}>
                {engagementData.map((v, i) => {
                  const x = (i / (engagementData.length - 1)) * 100
                  return (
                    <g key={i}>
                      <rect
                        x={`${x - 3}%`} y={120 - (v / 100) * 100} width="6%"
                        height={(v / 100) * 100}
                        fill="#6366F1" opacity={0.15} rx="3"
                      />
                      <rect
                        x={`${x - 1.5}%`} y={120 - (v / 100) * 100} width="3%"
                        height={(v / 100) * 100}
                        fill="#6366F1" rx="2"
                      />
                      <text x={`${x}%`} y={135} textAnchor="middle" fill="#64748B" fontSize={10} fontFamily="JetBrains Mono">{months[i]}</text>
                      {i === engagementData.length - 1 && (
                        <text x={`${x}%`} y={120 - (v / 100) * 100 - 6} textAnchor="middle" fill="#10B981" fontSize={11} fontWeight="600">{v}%</text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Department table */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2D40' }}>
                <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>Department Breakdown</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E2D40' }}>
                    {['Department', 'Members', 'Avg Skill', 'Active %', 'Target', 'Velocity'].map(h => (
                      <th key={h} style={{
                        padding: '10px 16px', textAlign: 'left',
                        fontFamily: 'JetBrains Mono', fontSize: 10, color: '#64748B',
                        letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {departments.map((d, i) => (
                    <tr key={i} style={{ borderBottom: i < departments.length - 1 ? '1px solid #1A2535' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>{d.name}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#94A3B8', fontFamily: 'JetBrains Mono' }}>{d.members}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="skill-bar" style={{ width: 60 }}>
                            <div className="skill-bar-fill" style={{ width: `${d.avgSkill}%`, background: '#6366F1' }} />
                          </div>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#94A3B8' }}>{d.avgSkill}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          fontFamily: 'JetBrains Mono', fontSize: 12,
                          color: d.active >= 85 ? '#10B981' : d.active >= 70 ? '#F59E0B' : '#F43F5E',
                        }}>{d.active}%</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748B', fontFamily: 'JetBrains Mono' }}>{d.target}%</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge" style={{ background: '#10B98118', border: '1px solid #10B98130', color: '#10B981' }}>{d.velocity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar: Org hierarchy */}
          <div>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: '#E2E8F0', marginBottom: 16 }}>Org Hierarchy</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Acme Corp', level: 0, color: '#6366F1' },
                  { label: 'Engineering', level: 1, color: '#06B6D4' },
                  { label: 'Frontend Team', level: 2, color: '#94A3B8' },
                  { label: 'Backend Team', level: 2, color: '#94A3B8' },
                  { label: 'Data Science', level: 1, color: '#06B6D4' },
                  { label: 'ML Research', level: 2, color: '#94A3B8' },
                  { label: 'Analytics', level: 2, color: '#94A3B8' },
                  { label: 'Product', level: 1, color: '#06B6D4' },
                  { label: 'Operations', level: 1, color: '#06B6D4' },
                ].map((n, i) => (
                  <div key={i} style={{
                    padding: '6px 10px', paddingLeft: 10 + n.level * 20,
                    borderRadius: 6, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 13, color: n.color,
                    background: n.level === 0 ? '#1C2538' : 'transparent',
                    fontWeight: n.level === 0 ? 700 : 400,
                  }}>
                    {n.level > 0 && <span style={{ color: '#1E2D40' }}>{'└'}</span>}
                    {n.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: '#E2E8F0', marginBottom: 16 }}>License Budget</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Used Seats', value: '156', total: '164', color: '#6366F1' },
                  { label: 'Q3 Budget Spent', value: '$18,240', total: '$20,000', color: '#10B981' },
                  { label: 'Dept Tiers', value: '3', total: 'tiers active', color: '#8B5CF6' },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: '#64748B' }}>{item.label}</span>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: item.color }}>
                        {item.value} <span style={{ color: '#334155' }}>/ {item.total}</span>
                      </span>
                    </div>
                    {typeof item.total === 'string' && item.total.includes('/') ? null : (
                      <div className="skill-bar">
                        <div className="skill-bar-fill" style={{
                          width: `${(parseInt(item.value.replace(/\D/g, '')) / parseInt(item.total.replace(/\D/g, ''))) * 100}%`,
                          background: item.color
                        }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'paths' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {paths.map((p, i) => (
            <div key={i} className="card card-hover" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#E2E8F0', marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div className="skill-bar" style={{ width: 200 }}>
                    <div className="skill-bar-fill" style={{ width: `${p.completion}%`, background: '#6366F1' }} />
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#6366F1' }}>{p.completion}% avg</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ fontSize: 20, color: '#E2E8F0' }}>{p.modules}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>modules</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ fontSize: 20, color: '#E2E8F0' }}>{p.enrolled}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>enrolled</div>
                </div>
              </div>
              <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: 12 }}>Edit Path</button>
            </div>
          ))}
          <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>+ New Learning Path</button>
        </div>
      )}

      {activeTab === 'risk' && (
        <div>
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: '#64748B' }}>AI identified</span>
            <span className="badge" style={{ background: '#F43F5E18', border: '1px solid #F43F5E30', color: '#F43F5E' }}>{atRisk.length} at-risk learners</span>
            <span style={{ fontSize: 14, color: '#64748B' }}>requiring intervention</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {atRisk.map((l, i) => (
              <div key={i} className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#1C2538', border: '1px solid #2A3F5C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#94A3B8',
                }}>{l.name.split(' ').map(n => n[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0', marginBottom: 4 }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{l.dept} · Last active {l.lastActive}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="skill-bar" style={{ width: 100 }}>
                    <div className="skill-bar-fill" style={{ width: `${l.progress}%`, background: l.risk === 'High' ? '#F43F5E' : '#F59E0B' }} />
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#64748B' }}>{l.progress}%</span>
                </div>
                <span className="badge" style={{
                  background: l.risk === 'High' ? '#F43F5E18' : '#F59E0B18',
                  border: `1px solid ${l.risk === 'High' ? '#F43F5E30' : '#F59E0B30'}`,
                  color: l.risk === 'High' ? '#F43F5E' : '#F59E0B',
                }}>{l.risk} Risk</span>
                <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}>Send Nudge</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
