<template>
  <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="originalImage">
      <h3>Original Image:</h3>
      <img :src="originalImage" alt="Original Image" />
      <p>Original Size: {{ originalSize }} KB</p>
    </div>

    <div v-if="originalImage">
      <h3>Compression and Conversion Settings:</h3>
      <label>
        Max Width:
        <input
          type="number"
          v-model.number="maxWidth"
          placeholder="Max Width (px)"
        />
      </label>
      <label>
        Max Height:
        <input
          type="number"
          v-model.number="maxHeight"
          placeholder="Max Height (px)"
        />
      </label>
      <label>
        Quality (0 to 1):
        <input
          type="number"
          v-model.number="quality"
          step="0.1"
          min="0"
          max="1"
        />
      </label>
      <label>
        Output Format:
        <select v-model="selectedFormat">
          <option value="image/jpeg">JPEG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WebP</option>
        </select>
      </label>
      <button @click="compressAndConvertImage">Compress & Convert Image</button>
    </div>

    <div v-if="processedImage">
      <h3>Processed Image:</h3>
      <img :src="processedImage" alt="Processed Image" />
      <p>Processed Size: {{ processedSize }} KB</p>
      <a
        :href="processedImage"
        :download="`processed.${getExtensionFromMimeType(
          processedFile?.value?.type || selectedFormat
        )}`"
        >Download Processed Image</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import imageCompression from "browser-image-compression";

const originalImage = ref(null);
const processedImage = ref(null);
const originalSize = ref(0);
const processedSize = ref(0);
const maxWidth = ref(null);
const maxHeight = ref(null);
const quality = ref(0.8);
const selectedFormat = ref("image/jpeg");
const imageFile = ref(null);
const processedFile = ref(null); // New variable to store the compressed file

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    originalImage.value = URL.createObjectURL(file);
    originalSize.value = (file.size / 1024).toFixed(2); // Size in KB
    processedImage.value = null;
    processedSize.value = 0;
    processedFile.value = null;
  }
};

const compressAndConvertImage = async () => {
  if (!imageFile.value) return;

  const options = {
    // Remove or adjust maxSizeMB as needed
    // maxSizeMB: 1,
    maxWidthOrHeight: maxWidth.value || maxHeight.value || undefined,
    useWebWorker: true,
    initialQuality: quality.value,
    fileType: selectedFormat.value,
  };

  try {
    const compressedFile = await imageCompression(imageFile.value, options);
    processedFile.value = compressedFile; // Store the compressed file
    processedImage.value = URL.createObjectURL(compressedFile);
    processedSize.value = (compressedFile.size / 1024).toFixed(2); // Size in KB
    console.log(processedFile.value);
  } catch (error) {
    console.error("Error processing image:", error);
    alert("An error occurred while processing the image.");
  }
};

const getExtensionFromMimeType = (mimeType) => {
  console.log(mimeType);

  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "img";
  }
};
</script>

<style scoped>
input[type="file"] {
  margin-bottom: 20px;
}

img {
  max-width: 500px;
  width: 100%;
  display: block;
  margin: 10px 0;
}

label {
  display: block;
  margin: 10px 0;
}

button {
  padding: 5px 10px;
}

a {
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  color: #fff;
  background: #28a745;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
