import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { taskService } from '../lib/tasks'
import type { Task } from '../types/task'

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)
  const loadTasks = useCallback(async () => {
    setLoading(true); setError('')
    try { setTasks(await taskService.list()) } catch (cause) { console.error(cause); setError('কাজগুলো লোড করা যায়নি। আবার চেষ্টা করুন।') } finally { setLoading(false) }
  }, [])
  useEffect(() => {
    let active = true
    taskService.list().then((items) => { if (active) setTasks(items) }).catch((cause: unknown) => {
      console.error(cause)
      if (active) setError('কাজগুলো লোড করা যায়নি। আবার চেষ্টা করুন।')
    }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const toggleComplete = async (task: Task) => {
    setBusyId(task.id); setError('')
    try {
      await taskService.update(task.id, { is_completed: !task.is_completed })
      setTasks((current) => current.map((item) => item.id === task.id ? { ...item, is_completed: !item.is_completed } : item))
    } catch (cause) { console.error(cause); setError('কাজের অবস্থা বদলানো যায়নি। আবার চেষ্টা করুন।') } finally { setBusyId(null) }
  }
  const deleteTask = async (task: Task) => {
    if (!window.confirm(`“${task.title}” কাজটি মুছে ফেলবেন?`)) return
    setBusyId(task.id); setError('')
    try { await taskService.remove(task.id); setTasks((current) => current.filter((item) => item.id !== task.id)) }
    catch (cause) { console.error(cause); setError('কাজটি মুছে ফেলা যায়নি। আবার চেষ্টা করুন।') } finally { setBusyId(null) }
  }
  const completedCount = tasks.filter((task) => task.is_completed).length

  return (
    <section className="page-section">
      <div className="page-heading">
        <div><span className="eyebrow">আপনার পরিকল্পনা</span><h1>আমার কাজ</h1><p className="page-subtitle">গুছিয়ে রাখুন, একে একে সম্পন্ন করুন।</p></div>
        <Link to="/create" className="button button-primary add-task-button"><span aria-hidden="true">＋</span> নতুন কাজ</Link>
      </div>
      {!loading && !error && tasks.length > 0 && <div className="progress-card"><div className="progress-copy"><span>আজকের অগ্রগতি</span><strong>{completedCount} <span>/ {tasks.length} সম্পন্ন</span></strong></div><div className="progress-track" role="progressbar" aria-label="কাজ সম্পন্নের অগ্রগতি" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={tasks.length}><span style={{ width: `${completedCount / tasks.length * 100}%` }} /></div></div>}
      {error && <div className="notice notice-error" role="alert"><span>{error}</span><Button variant="quiet" onClick={() => void loadTasks()}>আবার চেষ্টা</Button></div>}
      {loading ? <div className="state-card" role="status"><span className="spinner" /><p>আপনার কাজগুলো আনা হচ্ছে…</p></div> : tasks.length === 0 && !error ? <div className="state-card empty-state"><span className="empty-icon" aria-hidden="true">✳</span><h2>এখানে এখনো কোনো কাজ নেই</h2><p>আপনার প্রথম কাজটি যোগ করে শুরু করুন।</p><Link to="/create" className="button button-primary">প্রথম কাজটি যোগ করুন <span aria-hidden="true">→</span></Link></div> : <div className="task-list">{tasks.map((task) => <article key={task.id} className={`task-card${task.is_completed ? ' task-complete' : ''}`}><button type="button" className={`complete-toggle${task.is_completed ? ' checked' : ''}`} onClick={() => void toggleComplete(task)} disabled={busyId === task.id} aria-label={task.is_completed ? 'অসম্পন্ন হিসেবে চিহ্নিত করুন' : 'সম্পন্ন হিসেবে চিহ্নিত করুন'} aria-pressed={task.is_completed}><span aria-hidden="true">✓</span></button><div className="task-copy"><h2>{task.title}</h2>{task.description && <p>{task.description}</p>}<span className={`status-label ${task.is_completed ? 'status-done' : 'status-pending'}`}><span />{task.is_completed ? 'সম্পন্ন' : 'চলমান'}</span></div><div className="task-actions"><Link to={`/edit/${task.id}`} className="button button-secondary button-small">সম্পাদনা</Link><Button variant="danger" className="button-small" onClick={() => void deleteTask(task)} disabled={busyId === task.id}>মুছুন</Button></div></article>)}</div>}
    </section>
  )
}
