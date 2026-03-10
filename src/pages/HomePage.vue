<script setup>
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { useBannersStore } from '@/stores/banners'
import HeroBanner from '@/components/HeroBanner/HeroBanner.vue'
import ProductFiltersSidebar from '@/components/ProductFiltersSidebar/ProductFiltersSidebar.vue'
import ProductListing from '@/components/ProductListing/ProductListing.vue'

const categoryStore = useCategoryStore()
const bannersStore = useBannersStore()
const filterDrawerOpen = ref(false)

onMounted(() => {
  categoryStore.fetchCategories()
  bannersStore.fetchBanners()
})

function openFilterDrawer() {
  filterDrawerOpen.value = true
}

function closeFilterDrawer() {
  filterDrawerOpen.value = false
}
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="pt-4">
      <HeroBanner :slides="bannersStore.slides" />
    </div>

    <div class="py-6">
      <!-- Mobile filter trigger -->
      <div class="lg:hidden mb-4">
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="openFilterDrawer"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>

      <!-- Filter drawer overlay (mobile/tablet) -->
      <div
        v-if="filterDrawerOpen"
        class="fixed inset-0 z-30 lg:hidden"
        aria-hidden="true"
      >
        <button
          type="button"
          class="absolute inset-0 bg-black/50"
          aria-label="Close filters"
          @click="closeFilterDrawer"
        />
        <div class="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto z-40 p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Filters</h2>
            <button
              type="button"
              class="p-2 rounded hover:bg-gray-100"
              aria-label="Close"
              @click="closeFilterDrawer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ProductFiltersSidebar />
        </div>
      </div>

      <div class="flex gap-6">
        <!-- Sidebar: visible on lg+ -->
        <aside class="hidden lg:block w-64 shrink-0">
          <ProductFiltersSidebar />
        </aside>

        <div class="flex-1 min-w-0">
          <ProductListing />
        </div>
      </div>
    </div>
  </div>
</template>
