<template>
  <div class="bg-primary w-full">
    <header class=" text-white container mx-auto py-4">
      <div class="flex justify-between items-center w-full">
        <nav class="flex gap-3 tracking-widest">
          <router-link
            class="text-lg font-normal text-white hover:text-gray-400"
            v-for="(link, index) in links"
            :key="`to-${index}`"
            :to="link.to"
            >{{ link.name }}</router-link
          >
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
const links = [{ name: "Home", to: "/" }, {name: "Trello", to: "/trello"}];
</script>
