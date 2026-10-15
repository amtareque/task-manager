import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TaskForm from '../components/TaskForm'
import { taskService } from '../lib/tasks'

export default function CreateTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) { setError('কাজের নাম লিখুন।'); return }
    setSaving(true); setError('')
    try { await taskService.create({ title: title.trim(), description: description.trim() || null, is_completed: false }); navigate('/') }
    catch (cause) { console.error(cause); setError('কাজটি সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।') } finally { setSaving(false) }
  }
  return <section className="form-page"><Link to="/" className="back-link">← কাজের তালিকায় ফিরুন</Link><div className="form-heading"><span className="eyebrow">নতুন শুরু</span><h1>একটি কাজ যোগ করুন</h1><p>করণীয় বিষয়টি লিখে আপনার তালিকায় রাখুন।</p></div>{error && <div className="notice notice-error" role="alert">{error}<Button variant="quiet" onClick={() => setError('')}>বন্ধ করুন</Button></div>}<TaskForm title={title} description={description} saving={saving} submitLabel="কাজ সংরক্ষণ করুন" onTitleChange={setTitle} onDescriptionChange={setDescription} onSubmit={handleSubmit} /></section>
}
