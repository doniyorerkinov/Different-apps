<script setup lang="ts">
import Header from "./Header.vue";
</script>
<template>
  <div class="h-screen bg-gray-300">
    <Header />
    <main class="main" id="main">
      <router-view v-slot="{ Component }">
        <Transition name="fade" made="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
