<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '../types/todo'

// Recebemos a tarefa via props do componente pai (TodoList).
const props = defineProps<{
  todo: Todo
}>()

// Definimos os eventos que esse componente pode emitir para o pai.
const emit = defineEmits<{
  (event: 'toggle', id: string): void
  (event: 'remove', id: string): void
  (event: 'edit', id: string, description: string): void
}>()

// Usamos computed para derivar o texto de status a partir dos dados recebidos do pai.
const statusLabel = computed(() => (props.todo.done ? 'Concluída' : 'Pendente'))

// Função para editar a tarefa
function editTask() {
  const newDescription = prompt('Edite a descrição da tarefa:', props.todo.description)
  if (newDescription !== null && newDescription.trim() !== '') {
    emit('edit', props.todo.id, newDescription)
  }
}
</script>

<template>
  <li class="todo-item">
    <label class="info">
      <input type="checkbox" :checked="todo.done" @change="emit('toggle', todo.id)" />
      <div class="texts">
        <span class="description" :class="{ 'description-done': todo.done }">
          {{ todo.description }}
        </span>
        <small class="meta">
          {{ statusLabel }} • Criada em {{ new Date(todo.createdAt).toLocaleString() }}
        </small>
      </div>
    </label>
    <button class="edit" @click="editTask">editar</button>
    <button class="delete" @click="emit('remove', todo.id)">excluir</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
}

.todo-item .info {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
}

.todo-item .info input[type='checkbox'] {
  width: 1.15rem;
  height: 1.15rem;
  cursor: pointer;
}

.todo-item .info .texts {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.todo-item .info .description {
  font-weight: 600;
  color: #1e293b;
}

.todo-item .info .description-done {
  text-decoration: line-through;
  color: #94a3b8;
}

.todo-item .meta {
  color: #64748b;
}

.todo-item .edit {
  border: none;
  background: none;
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
}

.todo-item .delete {
  border: none;
  background: none;
  color: #ef4444;
  font-weight: 600;
  cursor: pointer;
}

.todo-item .delete:hover {
  text-decoration: underline;
}
</style>
