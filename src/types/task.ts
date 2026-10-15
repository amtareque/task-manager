export interface Task {
  id: string
  title: string
  description: string | null
  is_completed: boolean
  created_at: string
}

export type TaskInsert = Omit<Task, 'id' | 'created_at'>
export type TaskUpdate = Partial<TaskInsert>