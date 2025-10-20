<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { TodoFilter } from './types/todo'
import type { Todo } from './types/todo'

// Chave usada para persistir as tarefas no armazenamento local do navegador.
const STORAGE_KEY = 'todos'

// Estado reativo principal da aplicação.
const todos = ref<Todo[]>([])
const activeFilter = ref<TodoFilter>(TodoFilter.TODOS)

// Computed demonstra como derivar dados reativos sem repetir lógica manualmente.
const filteredTodos = computed(() => {
  switch (activeFilter.value) {
    case TodoFilter.COMPLETOS:
      return todos.value.filter((todo) => todo.done)
    case TodoFilter.PENDENTES:
      return todos.value.filter((todo) => !todo.done)
    default:
      return todos.value
  }
})

const remainingCount = computed(() => todos.value.filter((todo) => !todo.done).length)

function addTodo(description: string) {
  todos.value.push({
    id: crypto.randomUUID(),
    description,
    done: false,
    createdAt: new Date().toISOString(),
  })
}

function toggleTodo(id: string) {
  const todo = todos.value.find((todo) => todo.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

function removeTodo(id: string) {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

// Sempre que as tarefas mudarem, persistimos a nova lista.
watch(
  todos,
  (value) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

// Exemplo simples do ciclo de vida dos componentes: ao montar, carregamos os dados.
onMounted(() => {
  const persisted = window.localStorage.getItem(STORAGE_KEY)
  if (persisted) {
    try {
      todos.value = JSON.parse(persisted) as Todo[]
    } catch (error) {
      console.warn('Não foi possível ler as tarefas salvas anteriormente.', error)
    }
  }
})
</script>

<template>
  <main class="app">
    <header class="app-header">
      <h1 class="app-title">Trilha Vue.js - Lista de Tarefas</h1>
      <p class="app-subtitle">
        Gerencie suas atividades diárias praticando os conceitos essenciais do framework.
      </p>
    </header>

    <section class="app-content">
      <TodoForm @add-task="addTodo" />

      <hr style="width: 100%" />

      <TodoFilters v-model="activeFilter" />

      <TodoList :todos="filteredTodos" @toggle-task="toggleTodo" @remove-task="removeTodo" />

      <footer class="app-footer" role="status">
        <strong class="quantity">{{ remainingCount }}</strong>
        <span>
          {{ remainingCount === 1 ? 'tarefa pendente' : 'tarefas pendentes' }} para conquistar hoje
        </span>
      </footer>
    </section>
  </main>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #eee;
  color: #333;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.app .app-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.app .app-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  gap: 1.5rem;
}

.app .app-footer {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.app .app-footer .quantity {
  font-size: 1.25rem;
}
</style>
