import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import TaskForm from '../components/TaskForm'
import { taskService } from '../lib/tasks'

export default function EditTask() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    const load = async () => {
      if (!id) { setError('কাজটি খুঁজে পাওয়া যায়নি।'); setLoading(false); return }
      try { const task = await taskService.get(id); if (active) { setTitle(task.title); setDescription(task.description ?? ''); setIsCompleted(task.is_completed) } }
      catch (cause) { console.error(cause); if (active) setError('কাজটি খুঁজে পাওয়া যায়নি। তালিকায় ফিরে গিয়ে আবার চেষ্টা করুন।') }
      finally { if (active) setLoading(false) }
    }
    void load()
    return () => { active = false }
  }, [id])
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id || !title.trim()) { setError('কাজের নাম লিখুন।'); return }
    setSaving(true); setError('')
    try { await taskService.update(id, { title: title.trim(), description: description.trim() || null, is_completed: isCompleted }); navigate('/') }
    catch (cause) { console.error(cause); setError('পরিবর্তন সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।') } finally { setSaving(false) }
  }
  if (loading) return <div className="state-card" role="status"><span className="spinner" /><p>কাজের তথ্য আনা হচ্ছে…</p></div>
  return <section className="form-page"><Link to="/" className="back-link">← কাজের তালিকায় ফিরুন</Link><div className="form-heading"><span className="eyebrow">তালিকা হালনাগাদ</span><h1>কাজ সম্পাদনা</h1><p>প্রয়োজনমতো তথ্য বদলে সংরক্ষণ করুন।</p></div>{error && <div className="notice notice-error" role="alert"><span>{error}</span>{title && <Button variant="quiet" onClick={() => setError('')}>বন্ধ করুন</Button>}{!title && <Button variant="secondary" onClick={() => navigate('/')}>তালিকায় ফিরুন</Button>}</div>}{!error || title ? <TaskForm title={title} description={description} isCompleted={isCompleted} saving={saving} submitLabel="পরিবর্তন সংরক্ষণ করুন" onTitleChange={setTitle} onDescriptionChange={setDescription} onCompletedChange={setIsCompleted} onSubmit={handleSubmit} /> : null}</section>
}
