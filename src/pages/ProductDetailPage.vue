<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useProductDetail } from '@/composables/useProductDetail'
import { useRelatedProducts } from '@/composables/useRelatedProducts'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatters'
import ProductGrid from '@/components/ProductListing/ProductGrid.vue'
import ProductReviewSection from '@/components/ProductReviewSection/ProductReviewSection.vue'

const route = useRoute()
const cartStore = useCartStore()

const { product, loading, error } = useProductDetail(() => route.params.id)
const category = computed(() => product.value?.category ?? '')
const excludeId = computed(() => route.params.id)
const { products: relatedProducts, loading: relatedLoading } = useRelatedProducts(category, excludeId)

const priceFormatted = computed(() =>
  product.value ? formatPrice(product.value.price ?? product.value.priceFormatted) : ''
)

function addToCart() {
  if (product.value) cartStore.addItem(product.value)
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div v-if="loading" class="max-w-4xl mx-auto animate-pulse">
      <div class="h-64 md:h-96 bg-gray-200 rounded-lg mb-6" />
      <div class="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div class="h-6 bg-gray-200 rounded w-1/2 mb-6" />
      <div class="h-4 bg-gray-200 rounded w-full mb-2" />
      <div class="h-4 bg-gray-200 rounded w-full" />
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto text-center py-12">
      <p class="text-red-600">{{ error }}</p>
      <router-link to="/" class="mt-4 inline-block text-header-blue hover:underline">Back to Home</router-link>
    </div>

    <template v-else-if="product">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-contain p-4"
            />
          </div>
          <div>
            <p v-if="product.category" class="text-sm text-gray-500 uppercase tracking-wide mb-1">
              {{ product.category }}
            </p>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {{ product.name }}
            </h1>
            <p class="text-2xl font-bold text-gray-900 mb-4">{{ priceFormatted }}</p>
            <p v-if="product.inStock !== false" class="text-green-600 text-sm font-medium mb-6">In Stock</p>
            <p v-else class="text-red-600 text-sm font-medium mb-6">Out of Stock</p>
            <p v-if="product.description" class="text-gray-600 mb-6">{{ product.description }}</p>
            <button
              type="button"
              class="w-full md:w-auto px-6 py-3 bg-header-blue text-white font-medium rounded hover:bg-blue-800 transition-colors"
              :disabled="product.inStock === false"
              @click="addToCart"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Customer reviews -->
      <ProductReviewSection :product-id="product.id" />

      <!-- Same category products -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-xl font-bold text-gray-900 mb-4">
          More from {{ product.category || 'this category' }}
        </h2>
        <ProductGrid
          :products="relatedProducts"
          :loading="relatedLoading"
        />
      </div>
    </template>
  </div>
</template>
