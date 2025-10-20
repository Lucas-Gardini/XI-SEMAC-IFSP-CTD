<script setup lang="ts">
import { computed, ref } from 'vue'

// O formulário funciona isoladamente, avisando o componente pai quando uma nova tarefa
// deve ser criada. Essa comunicação acontece via eventos personalizados (emit).
const emit = defineEmits<{
  (event: 'add-task', description: string): void
}>()

// v-model guarda o valor do campo de descrição de forma reativa.
const description = ref('')

// Validação simples para evitar tarefas vazias.
const isDisabled = computed(() => description.value.trim().length === 0)

// Função chamada ao enviar o formulário.
function submitForm() {
  const text = description.value.trim()
  if (!text) return
  emit('add-task', text)
  description.value = ''
}
</script>

<template>
  <form class="todo-form" @submit.prevent="submitForm">
    <label for="todo-description"> Nova tarefa </label>
    <div class="controls">
      <input
        id="todo-description"
        v-model="description"
        type="text"
        placeholder="Ex: Revisar anotações da trilha"
      />
      <button type="submit" :disabled="isDisabled">Adicionar</button>
    </div>
  </form>
</template>

<style scoped>
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.todo-form label {
  font-weight: 600;
}

.todo-form .controls {
  display: flex;
  gap: 0.75rem;
}

.todo-form .controls input {
  flex: 1;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #c7c9d3;
  background-color: #f8fafc;
}

.todo-form .controls input:focus {
  outline: 2px solid #1bb79f;
  background-color: white;
}

.todo-form .controls button {
  padding: 0.65rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(135deg, #15b78f, #1bb79f);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s ease;
}

.todo-form .controls button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.todo-form .controls button:not(:disabled):hover {
  filter: brightness(1.1);
}
</style>
