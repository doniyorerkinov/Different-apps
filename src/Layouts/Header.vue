<template>
  <header class="w-full bg-gray-950 text-white px-8 py-4">
    <div class="flex justify-between items-center w-full">
      <nav class="flex">
        <router-link
          class="text-lg font-normal hover:text-gray-400"
          v-for="(link, index) in links"
          :key="`to-${index}`"
          :to="link.to"
          >{{ link.name }}</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const links = [{ name: "Home", to: "/" }];
</script>
