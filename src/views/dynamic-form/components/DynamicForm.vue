<template>
  <div>
    112122112
    {{ displayTime }}
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  timeZone: {
    type: String,
    default: "America/Los_Angeles",
  },
});

const currentDateTime = ref(new Date());
const displayTime = computed(() =>
  currentDateTime.value.toLocaleString("en-US", {
    timeZone: props.timeZone,
  })
);

setInterval(() => {
  currentDateTime.value = new Date();
});
</script>
