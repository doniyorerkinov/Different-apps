<template>
  <header class="header">
    <div class="nav-container" ref="navContainer">
      <nav class="nav-links">
        <router-link
          v-for="(link, index) in links"
          :key="`to-${index}`"
          :to="link.to"
          >{{ link.name }}</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script setup>
const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Photoshop File Upload", to: "/photoshop-file-upload" },
];
</script>
