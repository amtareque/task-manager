import type { FormEvent } from 'react'
import Button from './Button'

type TaskFormProps = {
  title: string
  description: string
  isCompleted?: boolean
  saving: boolean
  submitLabel: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onCompletedChange?: (value: boolean) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function TaskForm({ title, description, isCompleted, saving, submitLabel, onTitleChange, onDescriptionChange, onCompletedChange, onSubmit }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="form-card">
      <div className="field-group">
        <label htmlFor="task-title">কাজের নাম <span className="required-mark">*</span></label>
        <input id="task-title" value={title} onChange={(event) => onTitleChange(event.target.value)} placeholder="যেমন: সাপ্তাহিক পরিকল্পনা তৈরি" maxLength={120} required autoFocus />
        <span className="field-hint">সংক্ষিপ্ত ও স্পষ্ট নাম দিন</span>
      </div>
      <div className="field-group">
        <label htmlFor="task-description">বিস্তারিত <span className="optional-mark">ঐচ্ছিক</span></label>
        <textarea id="task-description" value={description} onChange={(event) => onDescriptionChange(event.target.value)} placeholder="কাজটি সম্পর্কে কিছু লিখুন..." rows={5} maxLength={1000} />
      </div>
      {onCompletedChange && <label className="check-row"><input type="checkbox" checked={Boolean(isCompleted)} onChange={(event) => onCompletedChange(event.target.checked)} /><span>কাজটি সম্পন্ন হয়েছে</span></label>}
      <div className="form-actions">
        <Button type="submit" disabled={saving}>{saving ? 'সংরক্ষণ হচ্ছে…' : submitLabel}<span aria-hidden="true"> →</span></Button>
      </div>
    </form>
  )
}
