<template>
    <div class="flex justify-center items-center fixed inset-0 z-[120]">
      <div
        @click="onClose"
        class="absolute bg-black opacity-80 top-0 left-0 h-full w-full z-[100]"
      ></div>
      <transition name="fade">
        <div
          class="text-white bg-primary min-w-[600px] min-h-[400px] rounded-2xl shadow-lg  shadow-primary z-[150] flex flex-col p-4"
        >
        <div class="flex justify-between items-center mb-1" v-if="!hideHeader">
          <span>{{ title }}</span>
          <x-icon class="cursor-pointer" @click="emit('close')"/>
        </div>
          <slot/>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { XIcon } from 'lucide-vue-next';
  interface IProps {
    title: string
    hideHeader?: boolean
  }
  withDefaults(defineProps<IProps>(), {
    hideHeader: false
  })
  const emit = defineEmits(["close"]);
  
  const onClose = () => {
    emit("close");
  };
  </script>
  