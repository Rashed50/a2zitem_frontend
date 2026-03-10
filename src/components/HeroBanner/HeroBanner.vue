<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BannerSlide from './BannerSlide.vue'

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
})

const currentIndex = ref(0)
const interval = ref(null)

const hasSlides = computed(() => props.slides && props.slides.length > 0)
const currentSlide = computed(() => {
  if (!hasSlides.value) return null
  return props.slides[currentIndex.value % props.slides.length]
})

function goPrev() {
  if (!hasSlides.value) return
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
  resetTimer()
}

function goNext() {
  if (!hasSlides.value) return
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
  resetTimer()
}

function resetTimer() {
  if (interval.value) clearInterval(interval.value)
  interval.value = setInterval(goNext, 5000)
}

onMounted(() => {
  if (hasSlides.value && props.slides.length > 1) resetTimer()
})

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})
</script>

<template>
  <section
    v-if="hasSlides"
    class="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-banner-orange to-banner-yellow py-6 md:py-10 px-4"
    aria-label="Promotional banner"
  >
    <div class="relative">
      <div class="relative flex items-center min-h-[200px] md:min-h-[280px]">
        <BannerSlide :slide="currentSlide" />

        <button
          type="button"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white text-header-blue"
          aria-label="Previous slide"
          @click="goPrev"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white text-header-blue"
          aria-label="Next slide"
          @click="goNext"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div
        v-if="slides.length > 1"
        class="flex justify-center gap-2 mt-4"
      >
        <button
          v-for="(_, i) in slides"
          :key="i"
          type="button"
          class="w-2 h-2 rounded-full transition-colors"
          :class="i === currentIndex ? 'bg-white' : 'bg-white/50'"
          :aria-label="`Go to slide ${i + 1}`"
          @click="currentIndex = i; resetTimer()"
        />
      </div>
    </div>
  </section>
</template>
