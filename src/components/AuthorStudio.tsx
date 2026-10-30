import { useState } from 'react'

const modules = [
  { id: 1, title: 'Intro to Neural Networks', tag: 'ML', type: 'Video + Quiz', views: 1240, completionRate: 82, dropOff: 12, updated: '3 days ago', status: 'Published' },
  { id: 2, title: 'Python List Comprehensions', tag: 'Python', type: 'Interactive', views: 2108, completionRate: 91, dropOff: 5, updated: '1 week ago', status: 'Published' },
  { id: 3, title: 'SQL Joins Deep Dive', tag: 'SQL', type: 'Flashcards', views: 876, completionRate: 64, dropOff: 31, updated: '2 weeks ago', status: 'Needs Update' },
  { id: 4, title: 'Cloud Cost Optimization', tag: 'Cloud', type: 'Video', views: 342, completionRate: 47, dropOff: 42, updated: '1 month ago', status: 'Needs Update' },
  { id: 5, title: 'Statistics: Bayesian Basics', tag: 'Stats', type: 'Quiz', views: 598, completionRate: 76, dropOff: 18, updated: '5 days ago', status: 'Draft' },
]

const blockTypes = [
  { type: 'Video', icon: '▶', color: '#6366F1', desc: 'Short explainer (< 5 min)' },
  { type: 'Flashcard', icon: '🃏', color: '#06B6D4', desc: 'Key concept recall card' },
  { type: 'Quiz', icon: '📝', color: '#F59E0B', desc: 'Multi-choice assessment' },
  { type: 'Poll', icon: '📊', color: '#10B981', desc: 'Quick opinion check' },
  { type: 'Text Block', icon: '📄', color: '#8B5CF6', desc: 'Rich formatted content' },
  { type: 'Code Exercise', icon: '⌨', color: '#F43F5E', desc: 'Interactive code challenge' },
]

const statusColor: Record<string, string> = {
  Published: '#10B981',
  'Needs Update': '#F59E0B',
  Draft: '#64748B',
}

export default function AuthorStudio() {
  const [activeTab, setActiveTab] = useState<'library' | 'create' | 'analytics'>('library')
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState('')
  const [canvasBlocks, setCanvasBlocks] = useState<string[]>(['Video', 'Quiz'])

  const runAI = () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    setAiOutput('')
    setTimeout(() => {
      setAiLoading(false)
      setAiOutput(`Generated 5 quiz questions for "${aiPrompt}":\n\n1. Which gradient descent variant uses the full dataset per update?\n   a) Mini-batch  b) Stochastic  c) Batch ✓  d) None\n\n2. What is the vanishing gradient problem?\n   It occurs when gradients shrink exponentially through deep layers, ✓\n   making early layers learn very slowly.\n\n3. ReLU activation helps prevent vanishing gradients because…\n   It outputs linear values for positive inputs, preserving gradient magnitude. ✓`)
    }, 1600)
  }

  return (
    <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="section-label" style={{ marginBottom: 8 }}>Author Studio</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: '#F1F5F9', margin: '0 0 4px' }}>
              Content Authoring Studio
            </h1>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              Build, analyze, and iterate on micro-learning modules.
            </p>
          </div>
          <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setActiveTab('create')}>+ New Module</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #1E2D40', marginBottom: 24 }}>
        {(['library', 'create', 'analytics'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '10px 20px', fontSize: 13, fontWeight: 500,
            background: 'none', border: 'none', cursor: 'pointer',
            color: activeTab === tab ? '#E2E8F0' : '#64748B',
            borderBottom: activeTab === tab ? '2px solid #6366F1' : '2px solid transparent',
            marginBottom: -1, transition: 'color 0.15s',
          }}>
            {tab === 'library' ? 'Module Library' : tab === 'create' ? 'Create / Edit' : 'Content Analytics'}
          </button>
        ))}
      </div>

      {activeTab === 'library' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2D40', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>Published Modules</span>
            <span style={{ fontSize: 12, color: '#64748B' }}>{modules.length} total</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E2D40' }}>
                {['Title', 'Type', 'Views', 'Completion', 'Drop-off', 'Status', ''].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontFamily: 'JetBrains Mono', fontSize: 10, color: '#64748B',
                    letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((m, i) => (
                <tr key={i} style={{ borderBottom: i < modules.length - 1 ? '1px solid #1A2535' : 'none' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0', marginBottom: 3 }}>{m.title}</div>
                    <span className="tag">{m.tag}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>{m.type}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'JetBrains Mono', fontSize: 12, color: '#94A3B8' }}>{m.views.toLocaleString()}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="skill-bar" style={{ width: 60 }}>
                        <div className="skill-bar-fill" style={{ width: `${m.completionRate}%`, background: '#10B981' }} />
                      </div>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#10B981' }}>{m.completionRate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono', fontSize: 12,
                      color: m.dropOff > 30 ? '#F43F5E' : m.dropOff > 15 ? '#F59E0B' : '#64748B',
                    }}>{m.dropOff}%</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge" style={{
                      background: `${statusColor[m.status]}18`,
                      border: `1px solid ${statusColor[m.status]}30`,
                      color: statusColor[m.status],
                    }}>{m.status}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: 12 }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'create' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
          {/* Block palette */}
          <div>
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 600, color: '#E2E8F0', marginBottom: 14 }}>Block Library</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {blockTypes.map((b, i) => (
                  <button key={i} onClick={() => setCanvasBlocks(prev => [...prev, b.type])} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                    background: '#151B26', border: '1px solid #1E2D40', borderRadius: 8,
                    cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s',
                    color: 'inherit',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#2A3F5C')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1E2D40')}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 6,
                      background: `${b.color}18`, border: `1px solid ${b.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0,
                    }}>{b.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{b.type}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>{b.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI assistant */}
            <div className="card" style={{ padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>🤖</span>
                <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>AI Assistant</div>
              </div>
              <textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="Describe your topic or paste text to generate quiz questions…"
                style={{
                  width: '100%', minHeight: 80, background: '#151B26', border: '1px solid #1E2D40',
                  borderRadius: 6, padding: '10px 12px', color: '#E2E8F0', fontSize: 12,
                  fontFamily: 'Inter', resize: 'vertical', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button className="btn-primary" style={{ width: '100%', marginTop: 10, fontSize: 12, padding: '8px' }} onClick={runAI} disabled={aiLoading}>
                {aiLoading ? 'Generating…' : 'Generate Questions'}
              </button>
              {aiOutput && (
                <pre style={{
                  marginTop: 12, padding: 12, background: '#080A0F', borderRadius: 6,
                  fontSize: 11, color: '#94A3B8', fontFamily: 'JetBrains Mono',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6,
                  border: '1px solid #1E2D40', maxHeight: 260, overflowY: 'auto',
                }}>{aiOutput}</pre>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <input
                  defaultValue="Untitled Module"
                  style={{
                    fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: '#E2E8F0',
                    background: 'none', border: 'none', outline: 'none', flex: 1,
                  }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 14px' }}>Preview</button>
                  <button className="btn-primary" style={{ fontSize: 12, padding: '6px 14px' }}>Publish</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <input placeholder="Add tag…" style={{
                  background: '#151B26', border: '1px solid #1E2D40', borderRadius: 6,
                  padding: '6px 10px', fontSize: 12, color: '#94A3B8', outline: 'none',
                  fontFamily: 'Inter', width: 120,
                }} />
                <select style={{
                  background: '#151B26', border: '1px solid #1E2D40', borderRadius: 6,
                  padding: '6px 10px', fontSize: 12, color: '#94A3B8', outline: 'none',
                  fontFamily: 'Inter',
                }}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              {/* Module canvas blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {canvasBlocks.map((block, i) => {
                  const bt = blockTypes.find(b => b.type === block)
                  return (
                    <div key={i} style={{
                      border: '1px dashed #2A3F5C', borderRadius: 8, padding: '16px 20px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: '#0E1117', cursor: 'grab',
                    }}>
                      <div style={{ color: '#334155', fontSize: 14 }}>⠿</div>
                      <div style={{
                        width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                        background: `${bt?.color ?? '#6366F1'}18`,
                        border: `1px solid ${bt?.color ?? '#6366F1'}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                      }}>{bt?.icon ?? '📄'}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>{block}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>Click to configure</div>
                      </div>
                      <button onClick={() => setCanvasBlocks(prev => prev.filter((_, j) => j !== i))} style={{
                        background: 'none', border: 'none', color: '#334155', cursor: 'pointer', fontSize: 16,
                      }}>×</button>
                    </div>
                  )
                })}
                {canvasBlocks.length === 0 && (
                  <div style={{
                    border: '1px dashed #1E2D40', borderRadius: 8, padding: '32px',
                    textAlign: 'center', color: '#334155', fontSize: 13,
                  }}>
                    Add blocks from the panel on the left
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {modules.filter(m => m.status !== 'Draft').map((m, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0', marginBottom: 4 }}>{m.title}</div>
                  <span className="tag">{m.tag}</span>
                </div>
                <span className="badge" style={{
                  background: `${statusColor[m.status]}18`,
                  border: `1px solid ${statusColor[m.status]}30`,
                  color: statusColor[m.status], alignSelf: 'flex-start',
                }}>{m.status}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'Views', value: m.views.toLocaleString(), color: '#6366F1' },
                  { label: 'Completion', value: `${m.completionRate}%`, color: '#10B981' },
                  { label: 'Drop-off', value: `${m.dropOff}%`, color: m.dropOff > 25 ? '#F43F5E' : '#64748B' },
                ].map((s, j) => (
                  <div key={j} style={{ background: '#151B26', borderRadius: 6, padding: '10px 12px', textAlign: 'center' }}>
                    <div className="stat-number" style={{ fontSize: 20, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {m.dropOff > 25 && (
                <div style={{
                  background: '#F43F5E10', border: '1px solid #F43F5E20',
                  borderRadius: 6, padding: '10px 14px', fontSize: 12, color: '#F43F5E',
                }}>
                  ⚠ High drop-off detected. Consider splitting this module or simplifying the assessment.
                </div>
              )}
              {m.status === 'Needs Update' && m.dropOff <= 25 && (
                <div style={{
                  background: '#F59E0B10', border: '1px solid #F59E0B20',
                  borderRadius: 6, padding: '10px 14px', fontSize: 12, color: '#F59E0B',
                }}>
                  Content last updated {m.updated}. Review for accuracy.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
