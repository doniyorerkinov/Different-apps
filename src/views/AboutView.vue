<template>
  <div class="about">
    <div style="margin-left: 50px;">
      <h3>Upload a PSD File</h3>
      <input type="file" @change="loadPSD" accept=".psd" />

      <div v-if="isLoading">Loading...</div>

      <div v-else-if="psdFile">
        <img :src="psdFile" alt="PSD Image" />
      </div>
      <div v-else>Please select a PSD file to upload.</div>
    </div>
  </div>
</template>
<script>
import { readPsd } from "ag-psd";
import { ref } from "vue";

const psdFile = ref(null);
const isLoading = ref(false);

function loadPSD(event) {
  const file = event.target.files[0];
  if (!file) return;

  isLoading.value = true;
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const arrayBuffer = e.target.result;
      const psdBuffer = new Uint8Array(arrayBuffer);
      const psd = readPsd(psdBuffer);

      // Convert the parsed PSD to an image (requires additional handling)
      // You might need to use a canvas or another library to render the image from the PSD data
      // For example purposes, let's assume we have a function renderPsdToImage(psd)

      // psdFile.value = renderPsdToImage(psd);

      // Since rendering a PSD to an image is non-trivial, consider using 'ag-psd' in combination with 'psd-render'
      // You can find 'psd-render' here: https://github.com/Agamnentzar/ag-psd/tree/master/packages/psd-render
    } catch (error) {
      console.error("Error parsing PSD file:", error);
      alert(
        "Failed to load PSD file. Please make sure the file is not corrupted."
      );
    } finally {
      isLoading.value = false;
    }
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
    alert("Failed to read file.");
    isLoading.value = false;
  };

  reader.readAsArrayBuffer(file);
}
</script>

<style></style>
