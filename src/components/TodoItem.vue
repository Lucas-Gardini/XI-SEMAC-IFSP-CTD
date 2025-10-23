<script setup lang="ts">
import type { Todo } from '@/types/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (event: 'toggle', id: string): void
  (event: 'remove', id: string): void
  (event: 'edit', id: string, newText: string): void
}>()

const toggle = () => emit('toggle', props.todo.id)
const remove = () => emit('remove', props.todo.id)

function edit() {
  const newText = prompt('Alterar tarefa', props.todo.text)
  if (newText !== null) {
    emit('edit', props.todo.id, newText.trim())
  }
}
</script>

<template>
  <li class="item">
    <label>
      <input type="checkbox" :checked="todo.done" @change="toggle" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </label>
    <button type="button" class="edit" @click="edit">Editar</button>
    <button type="button" class="remove" @click="remove">Excluir</button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: #f8fafc;
}

.item label {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex: 1;
}

.item span.done {
  text-decoration: line-through;
  color: #6b7280;
}

.remove {
  border: none;
  background: transparent;
  color: #dc2626;
  cursor: pointer;
}

.edit {
  border: none;
  background: transparent;
  color: #2563eb;
  cursor: pointer;
}
</style>
