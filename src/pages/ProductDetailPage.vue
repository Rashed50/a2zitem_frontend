<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useProductDetail } from '@/composables/useProductDetail'
import { useRelatedProducts } from '@/composables/useRelatedProducts'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatters'
import {
  getCategoryLabel,
  getProductDisplayName,
  getProductImageUrl,
  getProductUnitPrice,
} from '@/utils/productDisplay'
import { isProductInStock } from '@/utils/productFilters'
import ProductGrid from '@/components/ProductListing/ProductGrid.vue'
import ProductReviewSection from '@/components/ProductReviewSection/ProductReviewSection.vue'

const route = useRoute()
const cartStore = useCartStore()

const { product, loading, error } = useProductDetail(() => route.params.id)

const categoryLabel = computed(() => getCategoryLabel(product.value?.category))
const category = computed(() => categoryLabel.value)
const excludeId = computed(() => route.params.id)
const { products: relatedProducts, loading: relatedLoading } = useRelatedProducts(category, excludeId)

const displayTitle = computed(() => getProductDisplayName(product.value))
const heroImage = computed(() => {
  const url = getProductImageUrl(product.value)
  return url || 'https://placehold.co/600x600?text=No+Image'
})

const priceFormatted = computed(() => {
  if (!product.value) return ''
  const p = getProductUnitPrice(product.value)
  return formatPrice(p)
})

const inStock = computed(() => {
  const p = product.value
  if (!p) return true
  return isProductInStock(p)
})

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
              :src="heroImage"
              :alt="displayTitle"
              class="w-full h-full object-contain p-4"
            />
          </div>
          <div>
            <p v-if="categoryLabel" class="text-sm text-gray-500 uppercase tracking-wide mb-1">
              {{ categoryLabel }}
            </p>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {{ displayTitle }}
            </h1>
            <p class="text-2xl font-bold text-gray-900 mb-4">{{ priceFormatted }}</p>
            <p v-if="inStock" class="text-green-600 text-sm font-medium mb-6">In Stock</p>
            <p v-else class="text-red-600 text-sm font-medium mb-6">Out of Stock</p>
            <p v-if="product.description" class="text-gray-600 mb-6">{{ product.description }}</p>
            <button
              type="button"
              class="w-full md:w-auto px-6 py-3 bg-header-blue text-white font-medium rounded hover:bg-blue-800 transition-colors"
              :disabled="!inStock"
              @click="addToCart"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <ProductReviewSection :product-id="product.id" />

      <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-xl font-bold text-gray-900 mb-4">
          More from {{ categoryLabel || 'this category' }}
        </h2>
        <ProductGrid
          :products="relatedProducts"
          :loading="relatedLoading"
        />
      </div>
    </template>
  </div>
</template>
