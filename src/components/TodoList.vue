<script setup lang="ts">
import type { Todo } from '../types/todo'
import TodoItem from './TodoItem.vue'

defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  (event: 'toggle-task', id: string): void
  (event: 'remove-task', id: string): void
}>()
</script>

<template>
  <section class="todo-list">
    <header>
      <h2>Tarefas</h2>
      <span>{{ todos.length }}</span>
    </header>

    <TransitionGroup name="list" tag="ul" class="items">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle-task', $event)"
        @remove="emit('remove-task', $event)"
      />
    </TransitionGroup>

    <p v-if="todos.length === 0" class="empty">Nenhuma tarefa por aqui ainda.</p>
  </section>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.todo-list header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-list header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.todo-list header span {
  background-color: #1bb79f;
  color: white;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-weight: 600;
}

.todo-list .items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list .empty {
  text-align: center;
  padding: 2rem;
  background-color: #f8fafc;
  border-radius: 0.75rem;
  color: #475569;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
</style>
