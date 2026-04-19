<script setup>
import { computed } from 'vue'
import { formatPrice } from '@/utils/formatters'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const displayName = computed(() => props.product.name ?? props.product.title ?? 'Product')

const imageSrc = computed(() => {
  const imgs = props.product.images
  if (Array.isArray(imgs) && imgs.length > 0 && imgs[0]?.image) {
    return imgs[0].image
  }
  if (typeof props.product.image === 'string') {
    return props.product.image
  }
  return 'https://placehold.co/400x300?text=No+Image'
})

const displayPrice = computed(() => {
  const v = props.product.variants?.[0]?.selling_price
  if (v != null && v !== '') return formatPrice(v)
  return formatPrice(props.product.price ?? props.product.priceFormatted)
})
</script>

<template>
  <article class="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
    <div class="aspect-square bg-gray-100 relative overflow-hidden">
      <img
        :src="imageSrc"
        :alt="displayName"
        class="w-full h-full object-contain p-2"
        loading="lazy"
      />
    </div>
    <div class="p-4 flex-1 flex flex-col">
      <h3 class="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
        {{ displayName }}
      </h3>
      <p class="mt-2 text-lg font-bold text-gray-900">{{ displayPrice }}</p>
      <div class="mt-4 flex flex-col sm:flex-row gap-2">
        <router-link
          :to="`/product/${product.id}`"
          class="flex-1 px-4 py-2 bg-header-blue text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors text-center"
        >
          View Details
        </router-link>
      </div>
    </div>
  </article>
</template>
