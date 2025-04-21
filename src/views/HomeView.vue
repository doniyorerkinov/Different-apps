<template>
  <div class="p-8 flex flex-col items-center gap-6">
    <Input type="text" />
    <Input type="number" />
    <Input type="checkbox" id="checkbox" />
    <Input type="textarea" />
  </div>
</template>

<script setup lang="ts">
import Input from "../components/Form/Input.vue";
</script>

<style lang="scss" scoped></style>
