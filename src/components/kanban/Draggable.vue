// src/components/kanban/Draggable.vue
<template>
  <div
    draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
    @dragend="onDragEnd"
    class="draggable-item  flex flex-col justify-start "
    :class="[transferData.type == 'column' ? 'min-h-[600px] w-[340px]' : 'min-h-[80px]']"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ITransferData } from '../../Interfaces/Kanban';

const props = defineProps<{
  transferData: ITransferData;
}>();

const emit = defineEmits<{
  (e: 'dragEnd'): void;
}>();

const isDragging = ref(false);

function onDrag(e: DragEvent) {
  if (!e.dataTransfer) return;
  
  isDragging.value = true;
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('payload', JSON.stringify(props.transferData));
}

function onDragEnd() {
  isDragging.value = false;
  emit('dragEnd');
}
</script>

<style scoped>
.draggable-item {
  transition: all 0.2s ease;
}
.draggable-item.dragging {
  opacity: 0.5;
  transform: scale(0.95);
}
</style>