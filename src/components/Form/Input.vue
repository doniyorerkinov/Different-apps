<template>
  <div>
    <component
      v-if="type != 'checkbox'"
      :is="labelType == 'ifta' ? IftaLabel : FloatLabel"
    >
      <component
        :is="computedType"
        type="text"
        v-model="value"
        :size
        :useGrouping="useGrouping"
        rows="5"
        cols="30"
        autoResize
      />
      <label>{{ label }}</label>
    </component>
    <div v-if="type == 'checkbox'" class="flex gap-2 items-center">
      <Checkbox v-model="value" binary :inputId="id" :name="id" />
      <label :for="id">{{ label }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { IInput } from "../../Interfaces/Basics";
import { FloatLabel, IftaLabel, InputText, InputNumber } from "primevue";
import Checkbox from "primevue/checkbox";
import Textarea from "primevue/textarea";

const props = withDefaults(defineProps<IInput>(), {
  labelType: "over",
  label: "Label",
  useGrouping: false,
});

const value = ref<string>("");
const computedType = computed(() => {
  switch (props.type) {
    case "text":
      return InputText;
    case "number":
      return InputNumber;
    case "textarea":
      return Textarea;
    default:
      return InputText;
  }
});
</script>

<style scoped></style>
