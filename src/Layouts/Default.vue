<script setup lang="ts">
import Header from "./Header.vue";
</script>

<template>
  <div class="h-screen flex flex-col">
    <Header />
    <main class="flex-1 main" id="main">
      <!-- Background image container -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src="../assets/bg.webp" 
          alt="Background"
          class="w-full h-full object-cover "
        >
      </div>
      
      <!-- Content with semi-transparent backdrop -->
      <div class="relative h-full">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </Transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Ensure main takes full available space */
.main {
  position: relative;
}

/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>