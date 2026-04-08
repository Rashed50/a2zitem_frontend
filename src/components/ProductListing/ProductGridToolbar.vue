<script setup>
import { ref } from 'vue'

defineProps({
  sortBy: { type: String, default: 'text_quantity_desc' },
  perPage: { type: Number, default: 20 },
  total: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:sortBy', 'update:perPage'])

const compareCount = ref(0)
const sortOptions = [
  { value: 'text_quantity_desc', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

function onSortChange(e) {
  emit('update:sortBy', e.target.value)
}

function onShowChange(e) {
  const val = Number(e.target.value)
  if (val > 0) emit('update:perPage', val)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2">
    <div class="flex items-center gap-2">
      <!-- <input
        id="product-compare"
        type="checkbox"
        class="rounded border-gray-300 text-header-blue focus:ring-header-blue"
      /> -->
      <label for="product-compare" class="text-large font-semibold text-gray-700 cursor-pointer flex items-center gap-1">
        <!-- <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg> -->
         Our  Latest Collections
         <!-- ({{ compareCount }}) -->
      </label>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-2">
        <label for="sort-by" class="text-sm text-gray-700">Sort by</label>
        <select
          id="sort-by"
          :value="sortBy"
          class="rounded border border-gray-300 text-sm py-1.5 px-2 focus:ring-header-blue focus:border-header-blue"
          @change="onSortChange"
        >
          <option
            v-for="opt in sortOptions"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label for="show" class="text-sm text-gray-700">Show</label>
        <select
          id="show"
          :value="perPage"
          class="rounded border border-gray-300 text-sm py-1.5 px-2 focus:ring-header-blue focus:border-header-blue"
          @change="onShowChange"
        >
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</template>
