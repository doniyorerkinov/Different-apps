<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center"
  >
    <!-- Carousel Container -->
    <div class="relative max-w-5xl w-full h-[600px] overflow-hidden">
      <!-- Navigation Buttons -->
      <button
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white hover:text-amber-400 transition-colors"
        aria-label="Previous slide"
      >
        &#9664;
      </button>
      <button
        @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white hover:text-amber-400 transition-colors"
        aria-label="Next slide"
      >
        &#9654;
      </button>

      <!-- Cards Container -->
      <div class="relative flex justify-center items-center h-full">
        <div
          v-for="(student, index) in students"
          :key="student.id"
          v-show="isCardVisible(index)"
          class="absolute"
          :style="getCardStyle(index)"
        >
          <div class="card">
            <!-- School Logo & Score -->
            <div class="p-4 bg-gray-50 flex justify-between items-center">
              <img
                :src="student.schoolLogo"
                :alt="student.school"
                class="h-12 object-contain"
              />
              <span class="text-4xl font-bold text-gray-800">
                {{ student.score }}
              </span>
            </div>
            <!-- Student Info -->
            <div class="p-6 flex flex-col items-center">
              <img
                :src="student.image"
                :alt="student.name"
                class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-100"
              />
              <h3 class="text-xl font-bold text-gray-800 mb-1">
                {{ student.name }}
              </h3>
              <p class="text-gray-600">{{ student.school }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const students = ref([
  {
    id: 1,
    name: "Sarah Chen",
    score: 760,
    school: "Northwestern Kellogg",
    image:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/06/student_lieu_profile.jpg",
    schoolLogo:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/07/kellog_logo.png",
  },
  {
    id: 2,
    name: "Michael Patel",
    score: 750,
    school: "Harvard Business School",
    image:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/07/student_leonardo_profile.jpg",
    schoolLogo:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/07/kellog_logo.png",
  },
  {
    id: 3,
    name: "Emma Thompson",
    score: 770,
    school: "Stanford GSB",
    image:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/06/student_jim_profile.jpg",
    schoolLogo:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/07/kellog_logo.png",
  },
  {
    id: 4,
    name: "David Kim",
    score: 740,
    school: "Wharton",
    image: "https://cdn.e-gmat.com/wp-content/uploads/2021/06/mansi_dhiman.jpg",
    schoolLogo:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/07/kellog_logo.png",
  },
  {
    id: 5,
    name: "Lisa Wang",
    score: 780,
    school: "MIT Sloan",
    image:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/06/student_rhea_profile.jpg",
    schoolLogo:
      "https://cdn.e-gmat.com/wp-content/uploads/2021/07/kellog_logo.png",
  },
]);

const activeIndex = ref(2);

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % students.value.length;
};

const prevSlide = () => {
  activeIndex.value =
    (activeIndex.value - 1 + students.value.length) % students.value.length;
};

const isCardVisible = (index) => {
  const offset = Math.abs(index - activeIndex.value);
  return offset <= 2 || offset >= students.value.length - 2; // Show only 5 cards max
};

const getCardStyle = (index) => {
  const offset = index - activeIndex.value;
  const translateX = offset * 90; // Distance between cards
  const scale = 1 - Math.abs(offset) * 0.15; // Scale effect
  const opacity = 1 - Math.abs(offset) * 0; // Opacity effect

  return {
    transform: `translateX(${translateX}px) scale(${scale})`,
    opacity: opacity,
    transition: "transform 0.9s ease-in-out, opacity 0.9s ease-in-out",
    zIndex: 10 - Math.abs(offset),
  };
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  height: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
