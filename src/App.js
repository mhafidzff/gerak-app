import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import './App.css'

const PEOPLE = [
  { id: 'ica', label: 'Ica', color: '#7C3AED', light: '#EDE9FE' },
  { id: 'hfz', label: 'Hfz', color: '#EA580C', light: '#FFEDD5' },
]

const EXERCISES = [
  {
    id: 'renang',
    label: 'Renang',
    icon: '🏊',
    thresholds: {
      ica: '800m',
      hfz: '1km',
    },
  },
  {
    id: 'jalan',
    label: 'Jalan Kaki',
    icon: '🚶',
    thresholds: {
      ica: '45 min',
      hfz: '60 min',
    },
  },
  {
    id: 'lari',
    label: 'Berlari',
    icon: '🏃',
    thresholds: {
      ica: '25 min / 4km',
      hfz: '4km',
    },
  },
  {
    id: 'homeworkout',
    label: 'Home Workout',
    icon: '💪',
    thresholds: {
      ica: '15 min',
      hfz: '20 min',
    },
  },
  {
    id: 'yoga',
    label: 'Yoga / Pilates',
    icon: '🧘',
    thresholds: {
      ica: '1 sesi',
      hfz: '1 sesi',
    },
  },
  {
    id: 'sport',
    label: 'Futsal / Basket / Tracking / dll',
    icon: '⚽',
    thresholds: {
      ica: '1 sesi',
      hfz: '1 sesi',
    },
  },
]

const FINE_ICA = 75000
const FINE_HFZ = 50000

function getWeekStart(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  return d
}

function formatDate(d) {
  return d.toISOString().slice(0, 10)
}

function getWeekDates(weekStart) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })
}

function formatRupiah(n) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

const DAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // { date, person }
  const [submitting, setSubmitting] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [notes, setNotes] = useState('')
  const [tab, setTab] = useState('week') // 'week' | 'history' | 'fines'
  const [historyLogs, setHistoryLogs] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)

  const weekStart = getWeekStart((() => {
    const d = new Date()
    d.setDate(d.getDate() + weekOffset * 7)
    return d
  })())
  const weekDates = getWeekDates(weekStart)
  const weekEnd = weekDates[6]

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    const from = formatDate(weekStart)
    const to = formatDate(weekEnd)
    const { data, error } = await supabase
      .from('exercise_logs')
      .select('*')
      .gte('exercise_date', from)
      .lte('exercise_date', to)
    if (!error) setLogs(data || [])
    setLoading(false)
  }, [weekStart.toISOString()])

  useEffect(() => { fetchLogs() }, [fetchLogs])

  const fetchHistory = async () => {
    setHistoryLoading(true)
    const { data, error } = await supabase
      .from('exercise_logs')
      .select('*')
      .order('exercise_date', { ascending: false })
      .limit(100)
    if (!error) setHistoryLogs(data || [])
    setHistoryLoading(false)
  }

  useEffect(() => {
    if (tab === 'history') fetchHistory()
  }, [tab])

  function logsForPersonOnDate(personId, date) {
    return logs.filter(
      l => l.person_id === personId && l.exercise_date === formatDate(date)
    )
  }

  function weekCountForPerson(personId) {
    return logs.filter(l => l.person_id === personId).length
  }

  function openModal(date, person) {
    setModal({ date, person })
    setSelectedExercise(null)
    setNotes('')
  }

  function closeModal() {
    setModal(null)
    setSelectedExercise(null)
    setNotes('')
  }

  async function submitLog() {
    if (!selectedExercise || !modal) return
    setSubmitting(true)
    const { error } = await supabase.from('exercise_logs').insert({
      person_id: modal.person.id,
      exercise_date: formatDate(modal.date),
      exercise_type: selectedExercise.id,
      notes: notes.trim() || null,
    })
    if (!error) {
      await fetchLogs()
      closeModal()
    } else {
      alert('Gagal menyimpan: ' + error.message)
    }
    setSubmitting(false)
  }

  async function deleteLog(logId) {
    if (!window.confirm('Hapus catatan ini?')) return
    await supabase.from('exercise_logs').delete().eq('id', logId)
    await fetchLogs()
    if (tab === 'history') fetchHistory()
  }

  const weekLabel = `${DAYS_ID[weekStart.getDay()]} ${weekStart.getDate()} ${MONTHS_ID[weekStart.getMonth()]} – ${DAYS_ID[weekEnd.getDay()]} ${weekEnd.getDate()} ${MONTHS_ID[weekEnd.getMonth()]}`

  // Fine calculation: scan all weeks — rough approach for display
  function getFineDisplay() {
    const fines = []
    PEOPLE.forEach(p => {
      const cnt = weekCountForPerson(p.id)
      if (cnt < 2) {
        const amount = p.id === 'ica' ? FINE_ICA : FINE_HFZ
        fines.push({ person: p, amount, cnt })
      }
    })
    return fines
  }

  const thisWeekFines = getFineDisplay()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title">
            <span className="header-logo">🏋️</span>
            <span>Gerak</span>
          </div>
          <div className="header-sub">Ica & Hfz — min. 2x/pekan</div>
        </div>
        <div className="tabs">
          {[['week','Minggu Ini'],['history','Riwayat'],['fines','Denda']].map(([key,label]) => (
            <button key={key} className={'tab' + (tab === key ? ' active' : '')} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>
      </header>

      <main className="main">
        {tab === 'week' && (
          <>
            <div className="week-nav">
              <button className="nav-btn" onClick={() => setWeekOffset(o => o - 1)}>← Prev</button>
              <div className="week-label">{weekLabel}</div>
              <button className="nav-btn" onClick={() => setWeekOffset(o => o + 1)}>Next →</button>
            </div>

            <div className="score-cards">
              {PEOPLE.map(p => {
                const cnt = weekCountForPerson(p.id)
                const done = cnt >= 2
                return (
                  <div key={p.id} className="score-card" style={{ borderColor: done ? '#22c55e' : p.color }}>
                    <div className="score-name" style={{ color: p.color }}>{p.label}</div>
                    <div className="score-num" style={{ color: done ? '#16a34a' : p.color }}>{cnt} <span className="score-of">/ 2</span></div>
                    <div className="score-bar-track">
                      <div className="score-bar-fill" style={{ width: Math.min(cnt / 2 * 100, 100) + '%', background: done ? '#22c55e' : p.color }} />
                    </div>
                    {done
                      ? <div className="score-badge done">✓ Target tercapai!</div>
                      : <div className="score-badge miss">{2 - cnt}x lagi minggu ini</div>}
                  </div>
                )
              })}
            </div>

            {thisWeekFines.length > 0 && weekOffset === 0 && (
              <div className="fine-alert">
                ⚠️ Minggu ini: {thisWeekFines.map(f => `${f.person.label} belum 2x (${formatRupiah(f.amount)})`).join(' · ')}
              </div>
            )}

            {loading ? (
              <div className="loading">Memuat data…</div>
            ) : (
              <div className="days-list">
                {weekDates.map(date => {
                  const today = new Date(); today.setHours(0,0,0,0)
                  const isToday = date.getTime() === today.getTime()
                  return (
                    <div key={formatDate(date)} className={'day-row' + (isToday ? ' today' : '')}>
                      <div className="day-info">
                        <div className="day-name">{DAYS_ID[date.getDay()]}</div>
                        <div className="day-date">{date.getDate()}</div>
                      </div>
                      <div className="day-people">
                        {PEOPLE.map(p => {
                          const dayLogs = logsForPersonOnDate(p.id, date)
                          const hasDone = dayLogs.length > 0
                          return (
                            <div key={p.id} className="day-person-col">
                              <button
                                className={'log-btn' + (hasDone ? ' logged' : '')}
                                style={hasDone ? { borderColor: p.color, background: p.light, color: p.color } : { borderColor: '#e2e8f0' }}
                                onClick={() => openModal(date, p)}
                              >
                                <span className="log-btn-name" style={hasDone ? { color: p.color } : {}}>{p.label}</span>
                                {hasDone ? (
                                  <span className="log-btn-ex">
                                    {dayLogs.map(l => EXERCISES.find(e => e.id === l.exercise_type)?.icon).join('')}
                                  </span>
                                ) : (
                                  <span className="log-btn-plus" style={{ color: p.color }}>+</span>
                                )}
                              </button>
                              {hasDone && (
                                <div className="day-log-detail">
                                  {dayLogs.map(l => (
                                    <span key={l.id} className="log-chip" style={{ background: p.light, color: p.color }}>
                                      {EXERCISES.find(e => e.id === l.exercise_type)?.label}
                                      <button className="log-del" onClick={() => deleteLog(l.id)}>×</button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {tab === 'history' && (
          <div className="history-section">
            <h2 className="section-title">Riwayat Latihan</h2>
            {historyLoading ? <div className="loading">Memuat…</div> : (
              historyLogs.length === 0 ? <div className="empty">Belum ada catatan.</div> : (
                <div className="history-list">
                  {historyLogs.map(l => {
                    const p = PEOPLE.find(p => p.id === l.person_id)
                    const ex = EXERCISES.find(e => e.id === l.exercise_type)
                    return (
                      <div key={l.id} className="history-item">
                        <div className="history-left">
                          <span className="history-icon">{ex?.icon}</span>
                          <div>
                            <div className="history-ex">{ex?.label}</div>
                            <div className="history-date">{l.exercise_date} · {l.notes || '—'}</div>
                          </div>
                        </div>
                        <div className="history-right">
                          <span className="history-person" style={{ background: p?.light, color: p?.color }}>{p?.label}</span>
                          <button className="log-del" onClick={() => deleteLog(l.id)}>×</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            )}
          </div>
        )}

        {tab === 'fines' && (
          <div className="fines-section">
            <h2 className="section-title">Aturan & Denda</h2>
            <div className="rules-card">
              <div className="rules-title">Ketentuan Berolahraga</div>
              <table className="rules-table">
                <thead>
                  <tr><th>Jenis</th><th>Ica</th><th>Hfz</th></tr>
                </thead>
                <tbody>
                  {EXERCISES.map(ex => (
                    <tr key={ex.id}>
                      <td><span className="ex-icon">{ex.icon}</span> {ex.label}</td>
                      <td>{ex.thresholds.ica}</td>
                      <td>{ex.thresholds.hfz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="fine-cards">
              {PEOPLE.map(p => (
                <div key={p.id} className="fine-card" style={{ borderColor: p.color }}>
                  <div className="fine-person" style={{ color: p.color }}>{p.label}</div>
                  <div className="fine-amount">{formatRupiah(p.id === 'ica' ? FINE_ICA : FINE_HFZ)}</div>
                  <div className="fine-desc">per pekan jika &lt; 2x</div>
                </div>
              ))}
            </div>
            <div className="review-note">📅 Ketentuan direview: 8 April 2026 (setiap 2 bulan)</div>
            <div className="this-week-fine">
              <div className="rules-title">Minggu ini</div>
              {PEOPLE.map(p => {
                const cnt = weekCountForPerson(p.id)
                const fine = p.id === 'ica' ? FINE_ICA : FINE_HFZ
                return (
                  <div key={p.id} className="fine-status-row">
                    <span style={{ color: p.color, fontWeight: 500 }}>{p.label}</span>
                    <span>{cnt}x latihan</span>
                    {cnt >= 2
                      ? <span className="fine-ok">✓ Aman</span>
                      : <span className="fine-due" style={{ color: '#dc2626' }}>Denda {formatRupiah(fine)}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                Log olahraga — <span style={{ color: modal.person.color }}>{modal.person.label}</span>
              </div>
              <div className="modal-date">{DAYS_ID[modal.date.getDay()]}, {modal.date.getDate()} {MONTHS_ID[modal.date.getMonth()]}</div>
            </div>

            <div className="modal-section-label">Jenis olahraga</div>
            <div className="ex-grid">
              {EXERCISES.map(ex => (
                <button
                  key={ex.id}
                  className={'ex-option' + (selectedExercise?.id === ex.id ? ' selected' : '')}
                  style={selectedExercise?.id === ex.id ? { borderColor: modal.person.color, background: modal.person.light } : {}}
                  onClick={() => setSelectedExercise(ex)}
                >
                  <span className="ex-opt-icon">{ex.icon}</span>
                  <span className="ex-opt-label">{ex.label}</span>
                  <span className="ex-opt-threshold" style={{ color: modal.person.color }}>
                    min. {ex.thresholds[modal.person.id]}
                  </span>
                </button>
              ))}
            </div>

            <div className="modal-section-label">Catatan (opsional)</div>
            <input
              className="notes-input"
              type="text"
              placeholder={selectedExercise ? `Contoh: ${selectedExercise.id === 'renang' ? '900m, 35 menit' : '30 menit, seru!'}` : 'Detail, durasi, dll'}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />

            <div className="modal-actions">
              <button className="btn-cancel" onClick={closeModal}>Batal</button>
              <button
                className="btn-submit"
                style={{ background: modal.person.color }}
                disabled={!selectedExercise || submitting}
                onClick={submitLog}
              >
                {submitting ? 'Menyimpan…' : 'Simpan ✓'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
