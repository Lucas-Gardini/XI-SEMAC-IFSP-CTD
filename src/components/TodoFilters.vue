<script setup lang="ts">
import { defineModel } from 'vue'
import { TodoFilter } from '../types/todo'

// Lista de filtros disponíveis na interface.
const filters: { label: string; value: TodoFilter }[] = [
  { label: 'Todas', value: TodoFilter.TODOS },
  { label: 'Pendentes', value: TodoFilter.PENDENTES },
  { label: 'Concluídas', value: TodoFilter.COMPLETOS },
]

// Two-way data binding via v-model com o componente pai.
const model = defineModel<TodoFilter>({ default: TodoFilter.TODOS })
</script>

<template>
  <nav class="todo-filters" aria-label="Filtros de tarefas">
    <button
      v-for="filter in filters"
      :key="filter.value"
      type="button"
      :class="{ active: filter.value === model }"
      @click="model = filter.value"
    >
      {{ filter.label }}
    </button>
  </nav>
</template>

<style scoped>
.todo-filters {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.todo-filters button {
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid transparent;
  background-color: #e2e8f0;
  color: #1e293b;
  font-weight: 600;
  cursor: pointer;
}

.todo-filters button.active {
  border-color: #1bb79f;
  background-color: #ecfdf5;
}
</style>
