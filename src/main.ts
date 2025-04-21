import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

// PrimeVue Config
import PrimeVue from "primevue/config";
import Lara from "@primeuix/themes/lara";
import { definePreset } from "@primeuix/themes";

// PrimeVue Config
const myPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.600}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.900}",
          activeColor: "{primary.800}",
        },
        highlight: {
          background: "{primary.950}",
          focusBackground: "{primary.700}",
          color: "#ffffff",
          focusColor: "#ffffff",
        },
      },
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
// PrimeVue Config
app.use(PrimeVue, {
  theme: {
    preset: myPreset,
    options: {
      prefix: "p",
      darkModeSelector: false || "none",
    },
  },
});
app.mount("#app");
