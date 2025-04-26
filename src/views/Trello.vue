<template>
    <div class="container mx-auto py-2">
        <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Kanban Board</h1>
      <button 
        @click="addNewColumn"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Column
      </button>
    </div>
    
    <div class="flex items-start gap-4 overflow-x-auto pb-4">
      <Column 
        v-for="column in trelloStore.columns" 
        :key="column.columnId" 
        :column="column"
      />
    </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Column from '../components/kanban/Column.vue';
import { useTrelloStore } from '../store/trello';

const trelloStore = useTrelloStore();
const newColumnName = ref('');

function addNewColumn() {
  const name = prompt('Enter column name:');
  if (name) {
    trelloStore.addColumn(name);
  }
}
</script>

<style scoped>


/* Custom scrollbar for columns */
::-webkit-scrollbar {
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}</style>