const STORAGE_KEY = 'mini-course-todos'

type FilterOption = 'todas' | 'pendentes' | 'concluidas'

interface Todo {
  id: string
  text: string
  done: boolean
}

export { STORAGE_KEY }
export type { Todo, FilterOption }
