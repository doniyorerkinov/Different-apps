<script setup>
import { useRoute } from "vue-router";
import Header from "./Header.vue";

const route = useRoute();
</script>
<template>
  <div>
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
