import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const priceMin = ref(0)
  const priceMax = ref(37383)
  const availability = ref('in_stock')
  const subcategories = ref([])
  const brands = ref([])
  const category = ref(null)

  const queryParams = computed(() => ({
    priceMin: priceMin.value,
    priceMax: priceMax.value,
    availability: availability.value,
    subcategories: subcategories.value,
    brands: brands.value,
    category: category.value,
  }))

  function setPriceRange(min, max) {
    priceMin.value = min
    priceMax.value = max
  }

  function setAvailability(value) {
    availability.value = value
  }

  function setSubcategories(value) {
    subcategories.value = Array.isArray(value) ? value : [value]
  }

  function setBrands(value) {
    brands.value = Array.isArray(value) ? value : [value]
  }

  function setCategory(value) {
    if (value && typeof value === 'object') {
      category.value = value
    } else if (value == null || value === '') {
      category.value = null
    } else {
      category.value = value
    }
  }

  function clearFilters() {
    priceMin.value = 0
    priceMax.value = 37383
    availability.value = 'in_stock'
    subcategories.value = []
    brands.value = []
    category.value = null
  }

  return {
    priceMin,
    priceMax,
    availability,
    subcategories,
    brands,
    category,
    queryParams,
    setPriceRange,
    setAvailability,
    setSubcategories,
    setBrands,
    setCategory,
  }
})
