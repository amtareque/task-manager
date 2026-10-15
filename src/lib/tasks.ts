import { supabase } from './supabase'
import type { Task, TaskInsert, TaskUpdate } from '../types/task'

export const taskService = {
  async list(): Promise<Task[]> {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },
  async get(id: string): Promise<Task> {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single()
    if (error) throw error
    return data
  },
  async create(task: TaskInsert): Promise<void> {
    const { error } = await supabase.from('tasks').insert(task)
    if (error) throw error
  },
  async update(id: string, task: TaskUpdate): Promise<void> {
    const { error } = await supabase.from('tasks').update(task).eq('id', id)
    if (error) throw error
  },
  async remove(id: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) throw error
  },
}
