<script setup lang="ts">
const props = defineProps<{
  todo: {
    id: string
    text: string
    done: boolean
  }
}>()

const emit = defineEmits<{
  (event: 'toggle', id: string): void
  (event: 'remove', id: string): void
}>()

const toggle = () => emit('toggle', props.todo.id)
const remove = () => emit('remove', props.todo.id)
</script>

<template>
  <li class="item">
    <label>
      <input type="checkbox" :checked="todo.done" @change="toggle" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </label>
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
</style>
