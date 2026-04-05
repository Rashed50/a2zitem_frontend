<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFiltersStore } from '@/stores/filters'
import { useApiWithFallback } from '@/composables/useApiWithFallback'
import { getFilterOptions } from '@/services/filterService'
import { isValidFiltersResponse } from '@/utils/validators'
import PriceRangeSlider from './PriceRangeSlider.vue'
import FilterSection from './FilterSection.vue'

const filtersStore = useFiltersStore()
const filterOptions = ref({ priceMin: 0, priceMax: 137383, availability: [], subcategories: [], brands: [] })

const availabilityOptions = computed(() => filterOptions.value.availability || [])
const subcategoryOptions = computed(() => filterOptions.value.subcategories || [])
const brandOptions = computed(() => filterOptions.value.brands || [])

onMounted(async () => {
  const data = await useApiWithFallback(
    () => getFilterOptions(),
    'filters.json',
    isValidFiltersResponse
  )
  filterOptions.value = {
    priceMin: data?.priceMin ?? 0,
    priceMax: data?.priceMax ?? 137383,
    availability: data?.availability ?? [
      { value: 'in_stock', label: 'In Stock' },
      { value: 'out_of_stock', label: 'Out of Stock' },
    ],
    subcategories: data?.subcategories ?? [],
    brands: data?.brands ?? [],
  }
  if (filterOptions.value.priceMax > 0) {
    filtersStore.setPriceRange(filterOptions.value.priceMin, filterOptions.value.priceMax)
  }
})

function onAvailabilityChange(value) {
  filtersStore.setAvailability(value)
}

function onSubcategoryChange(values) {
  filtersStore.setSubcategories(values)
}

function onBrandChange(values) {
  filtersStore.setBrands(values)
}

function onPriceChange(min, max) {
  filtersStore.setPriceRange(min, max)
}
</script>

<template>
  <aside class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
    <PriceRangeSlider
      :min="filterOptions.priceMin"
      :max="filterOptions.priceMax"
      :model-min="filtersStore.priceMin"
      :model-max="filtersStore.priceMax"
      @update:range="onPriceChange"
    />

    <FilterSection
      title="AVAILABILITY"
      type="radio"
      :options="availabilityOptions"
      name="availability"
      :model-value="filtersStore.availability"
      value-key="value"
      label-key="label"
      @update:model-value="onAvailabilityChange"
    />

    <FilterSection
      title="SUBCATEGORIES"
      type="checkbox"
      :options="subcategoryOptions"
      :model-value="filtersStore.subcategories"
      @update:model-value="onSubcategoryChange"
    />

    <FilterSection
      title="BRANDS"
      type="radio"
      :options="brandOptions"
      name="brands"
      :model-value="filtersStore.brands[0]"
      @update:model-value="(v) => onBrandChange(v ? [v] : [])"
    />
  </aside>
</template>
