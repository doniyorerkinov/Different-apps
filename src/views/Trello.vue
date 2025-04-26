<template>
    <div class="container mx-auto py-2">
        <div class="flex justify-between items-center my-4 text-white">
      <div class="text-2xl font-bold bg-transparent backdrop-blur-lg px-2 py-1 rounded-md">Kanban Board</div>
      <button 
        @click="openModal = true"
        class="px-2 py-1 tracking-widest bg-transparent text-white hover:text-primary rounded hover:bg-white/80 transition-colors delay-100 ease-in backdrop-blur-lg"
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
    <Modal v-if="openModal" @close="CloseModal" title="Add Column">
      <div class="flex flex-col h-full flex-1">
        <div class="flex-1">Body</div>
        <div>Footer</div>
      </div>
    </Modal>
    </div>
</template>
<script setup lang="ts">
import Column from '../components/kanban/Column.vue';
import { useTrelloStore } from '../store/trello';
import Modal from "../components/UI/Modal.vue"
import { ref } from 'vue';

const trelloStore = useTrelloStore();

const openModal = ref<boolean>(false)

function addNewColumn() {
  const name = prompt('Enter column name:');
  if (name) {
    trelloStore.addColumn(name);
  }
}

function CloseModal() {
  openModal.value = false
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
}
</style>