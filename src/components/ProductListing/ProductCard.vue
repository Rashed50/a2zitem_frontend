<script setup>
import { formatPrice } from '@/utils/formatters'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const priceFormatted = formatPrice(props.product.price ?? props.product.priceFormatted)

function compareProduct() {
  // TODO: add to compare list
}
</script>

<template>
  <article class="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
    <div class="aspect-square bg-gray-100 relative overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-contain p-2"
        loading="lazy"
      />
    </div>
    <div class="p-4 flex-1 flex flex-col">
      <h3 class="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
        {{ product.name }}
      </h3>
      <p class="mt-2 text-lg font-bold text-gray-900">{{ priceFormatted }}</p>
      <div class="mt-4 flex flex-col sm:flex-row gap-2">
        <router-link
          :to="`/product/${product.id}`"
          class="flex-1 px-4 py-2 bg-header-blue text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors text-center"
        >
          View Details
        </router-link>
        <!-- <button
          type="button"
          class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors border border-gray-200"
          @click="compareProduct"
        >
          Compare This Product
        </button> -->
      </div>
    </div>
  </article>
</template>
