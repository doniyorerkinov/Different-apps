<script setup lang="ts">
import Header from "./Header.vue";
</script>
<template>
  <div class="h-screen flex flex-col">
    <Header />
    <main class="bg-primary-light flex-1" id="main">
      <router-view v-slot="{ Component }">
        <Transition name="fade" made="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </main>
  </div>
</template>

