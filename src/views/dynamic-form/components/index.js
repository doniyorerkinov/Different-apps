// src/custom-element.js
import Vue from "vue";
import wrap from "@vue/web-component-wrapper";

const DynamicFormElement = wrap(Vue, () =>
  import("./components/DynamicForm.vue")
);
window.customElements.define("dynamic-form", DynamicFormElement);
