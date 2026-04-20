<script setup>
import { /* ref */ } from 'vue'

defineProps({
  sortBy: { type: String, default: 'text_quantity_desc' },
  page_size: { type: Number, default: 50 },
  total: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:sortBy', 'update:page_size'])

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
  if (val > 0) emit('update:page_size', val)
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
         Our  Latest Collections
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
          :value="page_size"
          class="rounded border border-gray-300 text-sm py-1.5 px-2 focus:ring-header-blue focus:border-header-blue"
          @change="onShowChange"
        >
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
    </div>
  </div>
</template>
