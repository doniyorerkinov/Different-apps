<template>
  <div>
    <h3>Upload a PSD File</h3>
    <input type="file" @change="loadPSD" accept=".psd" />
    <img
      v-show="hasImage"
      class="mystyle"
      id="image"
      alt="PSD Image"
      :src="psdFileSrc"
    />
  </div>
</template>

<script setup>
import PSD from "psd.js";
import { ref } from "vue";

const psdFileSrc = ref(null); // Reactive data property to hold the image src
const hasImage = ref(false); // Reactive data property to hold the image src

async function loadPSD(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const url = window.URL.createObjectURL(file);
    const psd = await PSD.fromURL(url);

    // Get the image element
    const imgElement = psd.image.toPng();
    console.log(imgElement); // This logs the <img> element with src, width, and height

    // Extract the src attribute from the image element
    const imgSrc = imgElement.src;
    console.log(imgSrc);

    // Assign the src to your reactive data property
    psdFileSrc.value = imgSrc;
    hasImage.value = true;
  } catch (error) {
    console.error("Error parsing PSD file:", error);
    alert(
      "Failed to load PSD file. Please make sure the file is not corrupted."
    );
  }
}
</script>

<style scoped>
input[type="file"] {
  margin-bottom: 20px;
  display: block;
}

/* Center the container */
div#image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

/* Style the image */
div#image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px; /* Adds rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow */
  scale: -1;
}

/* Optional: Add a border around the image */
div#image img {
  border: 1px solid #ddd;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  div#image img {
    max-width: 80%;
  }
}

@media (min-width: 1024px) {
  div#image img {
    max-width: 60%;
  }
}

.mystyle {
  width: 400px !important;
}
</style>
