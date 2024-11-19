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
  { name: "Yandex Maps", to: "/yandex-maps" },
  { name: "Image Size Compressor", to: "/image-size-copressor" },
  { name: "Photoshop File Upload", to: "/photoshop-file-upload" },
  { name: "Image Type Changer", to: "/image-type-convertor" },
  { name: "Carousel", to: "/carousel" },
];
</script>
