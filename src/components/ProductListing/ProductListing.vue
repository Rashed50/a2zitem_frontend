<script setup>
import { watch } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useFiltersStore } from '@/stores/filters'
import ProductGridToolbar from './ProductGridToolbar.vue'
import ProductGrid from './ProductGrid.vue'

const productsStore = useProductsStore()
const filtersStore = useFiltersStore()

watch(
  () =>
    [
      filtersStore.priceMin,
      filtersStore.priceMax,
      filtersStore.availability,
      filtersStore.subcategories.join(','),
      filtersStore.brands.join(','),
      productsStore.sortBy,
      productsStore.perPage,
      productsStore.page,
    ].join('|'),
  () => {
    productsStore.fetchProducts()
  },
  { immediate: true }
)
</script>

<template>
  <div class="space-y-4">
    <ProductGridToolbar
      :sort-by="productsStore.sortBy"
      :per-page="productsStore.perPage"
      :total="productsStore.total"
      :loading="productsStore.loading"
      @update:sort-by="productsStore.setSort"
      @update:per-page="productsStore.setPerPage"
    />
    <ProductGrid
      :products="productsStore.products"
      :loading="productsStore.loading"
    />
  </div>
</template>
