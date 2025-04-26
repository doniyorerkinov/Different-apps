<script setup lang="ts">
import { useRoute } from "vue-router";
import Header from "./Header.vue";
const route = useRoute()
console.log(route.fullPath);

</script>

<template>
  <div class="h-screen flex flex-col">
    <Header class="fixed top-0 z-[50]" />
    <main class="flex-1 relative mt-12">
      <!-- Background image container -->
        <img  v-if="route.fullPath == '/trello'"
          src="../assets/bg.webp" 
          alt="Background"
          class="w-screen h-screen object-cover fixed inset-0 -z-10 overflow-hidden"
        >
      
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