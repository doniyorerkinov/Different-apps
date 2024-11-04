<template>
  <div class="wrapper">
    <div id="map"></div>
    <p v-if="selectedLocation">
      Selected Location: {{ selectedLocation[0] }}, {{ selectedLocation[1] }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";

const geolocations = ref([]);
const selectedLocation = ref(null);

onMounted(() => {
  const apiKey = import.meta.env.VITE_YANDEX_API_KEY;

  // Load Yandex Maps script dynamically
  const script = document.createElement("script");
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
  script.type = "text/javascript";
  document.head.appendChild(script);

  navigator.geolocation.getCurrentPosition((position) => {
    geolocations.value = [position.coords.latitude, position.coords.longitude];
  });

  script.onload = () => {
    ymaps.ready(() => {
      // Initialize the Yandex map
      const map = new ymaps.Map("map", {
        center: geolocations.value,
        zoom: 14,
      });

      // Add an initial marker for the current location
      const marker = new ymaps.Placemark(geolocations.value, {
        hintContent: "Current Location",
        balloonContent: "This is your current location",
      });
      map.geoObjects.add(marker);

      // Add a click listener on the map to get the selected location
      map.events.add("click", function (e) {
        // Get the coordinates of the clicked location
        const coords = e.get("coords");

        // Update the selected location reference
        selectedLocation.value = coords;

        // Update the marker position to the selected location
        marker.geometry.setCoordinates(coords);
        marker.properties.set({
          hintContent: "Selected Location",
          balloonContent: "This is your chosen location",
        });
      });
    });
  };
});
onUpdated(() => {
  const script = document.createElement("script");
  script.addEventListener("click", (e) => {
    console.log(e);
  });
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

#map {
  width: 800px;
  height: 400px;
}
</style>
