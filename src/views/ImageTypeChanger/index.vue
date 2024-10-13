<template>
  <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="originalImage">
      <h3>Original Image:</h3>
      <img :src="originalImage" alt="Original Image" />
    </div>

    <div v-if="originalImage">
      <h3>Select Output Format:</h3>
      <select v-model="selectedFormat">
        <option value="image/jpeg">JPEG</option>
        <option value="image/png">PNG</option>
        <option value="image/webp">WebP</option>
        <option value="image/bmp">BMP</option>
      </select>
      <button @click="convertImage">Convert Image</button>
    </div>

    <div v-if="convertedImage">
      <h3>Converted Image:</h3>
      <img :src="convertedImage" :alt="selectedFormat" />
      <a
        :href="convertedImage"
        :download="`converted.${getExtension(selectedFormat)}`"
        >Download Converted Image</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const originalImage = ref(null);
const convertedImage = ref(null);
const selectedFormat = ref("image/jpeg");

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage.value = e.target.result;
      convertedImage.value = null; // Reset the converted image when a new file is selected
    };
    reader.readAsDataURL(file);
  }
};

const convertImage = () => {
  if (!originalImage.value) return;

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const quality = 0.92; // Adjust quality for lossy formats like JPEG and WebP

    canvas.toBlob(
      (blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          convertedImage.value = e.target.result;
        };
        reader.readAsDataURL(blob);
      },
      selectedFormat.value,
      quality
    );
  };
  img.src = originalImage.value;
};

const getExtension = (mimeType) => {
  switch (mimeType) {
    case "image/jpeg":
      return "jpeg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/bmp":
      return "bmp";
    default:
      return "img";
  }
};
</script>

<style scoped lang="scss">
input {
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  width: 350px;
  display: block;
  margin: 10px 0;
}

select {
  margin-right: 10px;
  padding: 5px;
}

button {
  padding: 5px 10px;
}

a {
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  color: #fff;
  background: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
