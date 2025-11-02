<template>
  <div style="
      position: relative;
      overflow: hidden;
      min-height: clamp(300px, 42vw, 520px);
      color: #fff;
    ">
    <!-- Background Image + Overlay -->
    <template v-if="slide?.background_image">
      <img :src="slide.background_image" :alt="'Hero Slide Background'" style="width: 100%;" />
    </template>

    <!-- Content Wrapper -->
    <div style="
        position: relative;
        z-index: 20;
        margin: 0 auto;
        padding: 0 clamp(16px, 4vw, 20px);
      ">
      <!-- Controls -->
      <button @click="paginate(-1)" style="
        direction: ltr;
          position: absolute;
          left: 40px;
          transform: translateY(-50%);
          background-color: #ffffff88;
          border: none;
          padding: 8px 21px;
          border-radius: 50%;
          color: #000;
          font-size: 24px;
          cursor: pointer;
          z-index: 30;
          margin-top: -17%;
        " aria-label="Previous slide">
        ‹
      </button>

      <button @click="paginate(1)" style="
      direction: ltr;
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #ffffff88;
          border: none;
          padding: 8px 21px;
          border-radius: 50%;
          color: #000;
          font-size: 24px;
          cursor: pointer;
          z-index: 30;
          margin-top: -17%;
        " aria-label="Next slide">
        ›
      </button>

      <!-- Dots -->
      <div style="
          display: flex;
          gap: 6px;
          margin-top: 16px;
          position: absolute;
          bottom: 50px;
          left: 0;
          right: 0;
          justify-content: center;
          z-index: 30;
        ">
        <button v-for="(s, i) in slides" :key="i" @click="index = i" :style="{
          width: '10px',
          height: '10px',
          borderRadius: '9999px',
          border: 0,
          background: i === index ? '#fff' : '#9ca3af',
          cursor: 'pointer',
        }"></button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import { useRuntimeConfig } from "#app";

export interface HeroSlideResponse {
  id: number;
  background_image?: string;
  align?: string;
}

const props = defineProps<{
  slides: HeroSlideResponse[];
  brand: { darkBlue: string };
}>();

const slides = props.slides || [];
const index = ref(0);
const direction = ref(0);
const runtime = useRuntimeConfig();

function paginate(newDir: number) {
  direction.value = newDir;
  index.value = (index.value + newDir + slides.length) % slides.length;
}

const slide = computed(() => slides[index.value]);
const align = computed(() => slide.value?.align ?? "left");
const isRight = computed(() => align.value === "right");
const textAlign = computed(() =>
  align.value === "center" ? "center" : align.value === "right" ? "right" : "left"
);
const justifyContent = computed(() =>
  align.value === "center"
    ? "center"
    : align.value === "right"
      ? "flex-end"
      : "flex-start"
);

// image path helper
function resolveSrc(path?: string) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `${runtime.public.apiBase}${path}`;
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}
</style>
