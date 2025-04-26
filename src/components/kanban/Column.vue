// src/components/kanban/Column.vue
<template>
  <DropZone 
    @drop-data="onDrop"
    class="flex flex-col gap-2"
  >
    <Draggable
      :transfer-data="{
        type: 'column',
        columnId: column.columnId
      }"
      class="p-4 glass-effect text-white rounded-lg shadow"
    >
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold">{{ column.name }}</h3>
      </div>
      
      <DropZone
        @drop-data="onTaskDrop"
        class="flex-1 min-h-40 flex flex-col gap-4"
      >
        <Draggable
          v-for="(task, index) in column.tasks"
          :key="task.taskId"
          :transfer-data="{
            type: 'task',
            columnId: column.columnId,
            taskId: task.taskId,
            fromIndex: index
          }"
          class="p-3 rounded shadow hover:shadow-md transition-shadow !h-12 bg-primary-light w-full flex flex-col"
          @drag-end="onTaskDragEnd"
        >
          <div class="font-medium">{{ task.name }}</div>
          <div class="text-sm text-gray-600">{{ task.description }}</div>
        </Draggable>
      </DropZone>
      <AddTask :column-id="column.columnId" />
    </Draggable>
  </DropZone>
</template>

<script setup lang="ts">
import { ITRelloColumn, ITransferData } from '../../Interfaces/Kanban';
import { useTrelloStore } from '../../store/trello';
import Draggable from './Draggable.vue';
import DropZone from './DropZone.vue';
import AddTask from './AddTask.vue';

const props = defineProps<{
  column: ITRelloColumn;
}>();

const trelloStore = useTrelloStore();

function onDrop(transferData: ITransferData & { toIndex?: number }) {
  if (transferData.type === 'column') {
    // Handle column reordering
    const fromIndex = trelloStore.columns.findIndex(c => c.columnId === transferData.columnId);
    const toIndex = trelloStore.columns.findIndex(c => c.columnId === props.column.columnId);
    
    if (fromIndex !== -1 && toIndex !== -1) {
      trelloStore.moveColumn(fromIndex, toIndex);
    }
  }
}

function onTaskDrop(transferData: ITransferData & { toIndex?: number }) {
  if (transferData.type === 'task') {
    trelloStore.moveTask({
      ...transferData,
      toColumnId: props.column.columnId,
      toIndex: transferData.toIndex
    });
  }
}

function onTaskDragEnd() {
  // Optional: Add any cleanup or visual feedback
}

function deleteColumn() {
  if (confirm(`Delete column "${props.column.name}" and all its tasks?`)) {
    trelloStore.deleteColumn(props.column.columnId);
  }
}
</script>
<style scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.glass-task {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Optional: Add hover effect */
.glass-effect:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.5);
}

/* Ensure text is readable on glass background */
.font-semibold, .font-medium {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>