// src/components/kanban/DropZone.vue
<template>
  <div 
    @drop.stop="onDrop"
    @dragover.prevent="onDragOver"
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    class="drop-zone"
    :class="{ 'drag-over': isDragOver }"
    ref="dropZone"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ITransferData } from '../../Interfaces/Kanban';

const emit = defineEmits<{
  (e: 'dropData', payload: ITransferData & { toIndex?: number }): void
}>();

const dropZone = ref<HTMLElement>();
const isDragOver = ref(false);

function onDragOver(e: DragEvent) {
  isDragOver.value = true;
  e.preventDefault();
}

function onDragEnter(e: DragEvent) {
  isDragOver.value = true;
  e.preventDefault();
}

function onDragLeave(e: DragEvent) {
  // Only set to false if leaving the drop zone entirely
  if (dropZone.value && e.relatedTarget && !dropZone.value.contains(e.relatedTarget as Node)) {
    isDragOver.value = false;
  }
}

function onDrop(e: DragEvent) {
  if (!e.dataTransfer || !dropZone.value) return;
  
  isDragOver.value = false;
  
  try {
    const payload = JSON.parse(e.dataTransfer.getData('payload')) as ITransferData;
    
    // Calculate drop position
    let toIndex: number | undefined;
    if (dropZone.value.children.length > 0) {
      const children = Array.from(dropZone.value.children);
      const rect = dropZone.value.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      
      // Find the position where the item should be inserted
      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        if (relativeY < childRect.top + childRect.height / 2 - rect.top) {
          toIndex = i;
          break;
        }
      }
      
      // If dropped at the end
      if (toIndex === undefined) {
        toIndex = children.length;
      }
    }
    
    emit('dropData', {
      ...payload,
      toIndex
    });
  } catch (error) {
    console.error('Error parsing drop data:', error);
  }
}
</script>

<style scoped>
.drop-zone {
  min-height: 100px;
  transition: background-color 0.2s ease;
}
.drop-zone.drag-over {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>