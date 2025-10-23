<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { STORAGE_KEY, type FilterOption, type Todo } from './types/todo'

import TodoItem from './components/TodoItem.vue'

const todos = ref<Todo[]>([])
const newTodo = ref('')
const filter = ref<FilterOption>('todas')

const visibleTodos = computed(() => {
  if (filter.value === 'pendentes') {
    return todos.value.filter((todo) => !todo.done)
  }

  if (filter.value === 'concluidas') {
    return todos.value.filter((todo) => todo.done)
  }

  return todos.value
})

const pendingCount = computed(() => todos.value.filter((todo) => !todo.done).length)

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now().toString(),
    text,
    done: false,
  })

  newTodo.value = ''
}

function editTodo(id: string, newText: string) {
  const todo = todos.value.find((item) => item.id === id)
  if (todo) {
    todo.text = newText
  }
}

function toggleTodo(id: string) {
  const todo = todos.value.find((item) => item.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

function removeTodo(id: string) {
  todos.value = todos.value.filter((item) => item.id !== id)
}

watch(
  todos,
  (value) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

onMounted(() => {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved) {
    todos.value = JSON.parse(saved) as Todo[]
  }
})
</script>

<template>
  <main class="app">
    <h1>Lista de Tarefas</h1>

    <form class="form" @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Ex: preparar material do minicurso"
        aria-label="Descrição da tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>

    <section class="filters" aria-label="Filtros de tarefas">
      <button type="button" :class="{ active: filter === 'todas' }" @click="filter = 'todas'">
        Todas
      </button>
      <button
        type="button"
        :class="{ active: filter === 'pendentes' }"
        @click="filter = 'pendentes'"
      >
        Pendentes
      </button>
      <button
        type="button"
        :class="{ active: filter === 'concluidas' }"
        @click="filter = 'concluidas'"
      >
        Concluídas
      </button>
    </section>

    <ul class="list">
      <TodoItem
        v-for="todo in visibleTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @edit="editTodo"
        @remove="removeTodo"
      />
    </ul>

    <p v-if="visibleTodos.length === 0" class="empty">Nenhuma tarefa por aqui ainda.</p>

    <footer class="status" role="status">
      <strong>{{ pendingCount }}</strong>
      <span>{{ pendingCount === 1 ? 'tarefa pendente' : 'tarefas pendentes' }}</span>
    </footer>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI';
  background: #f5f5f5;
  color: #222;
}

.app {
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.app h1 {
  margin: 0;
  text-align: center;
}

.form {
  display: flex;
  gap: 0.75rem;
}

.form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d4d4d8;
  border-radius: 8px;
}

.form button {
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  background: #16a34a;
  color: #fff;
  cursor: pointer;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.filters button {
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: #e5e7eb;
  cursor: pointer;
}

.filters button.active {
  background: #16a34a;
  color: #fff;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty {
  text-align: center;
  color: #6b7280;
}

.status {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}
</style>
