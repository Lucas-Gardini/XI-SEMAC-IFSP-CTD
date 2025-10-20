// A estrutura principal de uma tarefa para a aplicação de To-Do.
// Definimos aqui para que o tipo possa ser reutilizado em vários componentes
export interface Todo {
  id: string
  description: string
  done: boolean
  createdAt: string
}

// Filtros aceitos pela aplicação para controlar quais tarefas aparecem.
export enum TodoFilter {
  TODOS = 'todos',
  PENDENTES = 'pendentes',
  COMPLETOS = 'completos',
}
