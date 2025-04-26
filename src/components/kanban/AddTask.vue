// src/components/kanban/AddTask.vue
<template>
  <div class="mt-2">
    <button 
      @click="showForm = true"
      v-if="!showForm"
      class="w-full text-left text-gray-500 hover:text-gray-700"
    >
      + Add task
    </button>
    
    <div v-else class="space-y-2">
      <input
        v-model="taskName"
        placeholder="Task name"
        class="w-full p-2 border rounded"
        ref="nameInput"
      />
      <textarea
        v-model="taskDescription"
        placeholder="Description"
        class="w-full p-2 border rounded"
      ></textarea>
      <div class="flex gap-2">
        <button 
          @click="addTask"
          class="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add
        </button>
        <button 
          @click="cancel"
          class="px-3 py-1 bg-gray-200 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { useTrelloStore } from '../../store/trello';

const props = defineProps<{
  columnId: string;
}>();

const trelloStore = useTrelloStore();
const showForm = ref(false);
const taskName = ref('');
const taskDescription = ref('');
const nameInput = ref<HTMLInputElement>();

function addTask() {
  if (!taskName.value.trim()) return;
  
  trelloStore.addTask({
    name: taskName.value,
    description: taskDescription.value,
    columnId: props.columnId
  });
  
  // Reset form
  taskName.value = '';
  taskDescription.value = '';
  showForm.value = false;
}

function cancel() {
  showForm.value = false;
  taskName.value = '';
  taskDescription.value = '';
}

// Focus input when form appears
watch(showForm, async (value) => {
  if (value) {
    await nextTick();
    nameInput.value?.focus();
  }
});
</script>