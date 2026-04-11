<script setup>
defineProps({
  slide: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<!-- <template>
  <div
    v-if="slide"
    class="flex flex-col md:flex-row items-center justify-between w-full gap-6 h-[300px] md:h-[400px]"
  >
    <div class="flex-1 text-white">
      <p v-if="slide.subtitle" class="text-sm md:text-base font-medium opacity-90">{{ slide.subtitle }}</p>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-1">{{ slide.title }}</h2>
      <p v-if="slide.tagline" class="mt-2 text-lg md:text-xl text-red-600 font-medium">{{ slide.tagline }}</p>
      <a
        v-if="slide.ctaText && slide.ctaUrl"
        :href="slide.ctaUrl"
        class="inline-block mt-4 px-6 py-2 bg-white text-header-blue font-semibold rounded-lg hover:bg-gray-100"
      >
        {{ slide.ctaText }}
      </a>
    </div>

    <div class="flex-1 flex justify-center items-center h-full">
      <img
        v-if="slide.image"
        :src="slide.image"
        :alt="slide.title"
        class="w-auto h-4/5 max-h-[250px] md:max-h-[320px] object-contain rounded-lg border-2 border-white/40 bg-white/5 p-2 shadow-xl" 
      />
    </div>
  </div>
</template> -->

<template>
  <div
    v-if="slide"
    class="flex flex-col md:flex-row items-center justify-between w-full gap-6"
  >
    <div class="flex-1 text-white">
      <p v-if="slide.subtitle" class="text-sm md:text-base font-medium opacity-90">{{ slide.subtitle }}</p>
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">{{ slide.title }}</h2>
      <p v-if="slide.tagline" class="mt-2 text-lg md:text-xl text-red-600 font-medium">{{ slide.tagline }}</p>
      <!-- <a
        v-if="slide.ctaText && slide.ctaUrl"
        :href="slide.ctaUrl"
        class="inline-block mt-4 px-6 py-2 bg-white text-header-blue font-semibold rounded-lg hover:bg-gray-100"
      >
        {{ slide.ctaText }}
      </a> -->
    </div>
    <div class="flex-1 flex justify-center">
      <img
        v-if="slide.image"
        :src="slide.image"
        :alt="slide.title"    
        class="w-auto h-4/5 max-h-[250px] md:max-h-[320px] object-contain rounded-lg border-2 border-white/40 bg-white/5 p-2 shadow-xl" 
     
      />
    </div>
  </div>
</template>  
