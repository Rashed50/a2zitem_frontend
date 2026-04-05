import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiWithFallback } from '@/composables/useApiWithFallback'
import { getProducts } from '@/services/productService'
import { isValidProductResponse } from '@/utils/validators'
import { useFiltersStore } from './filters'

export const useProductsStore = defineStore('products', () => {
  const list = ref([])
  const total = ref(0)
  const loading = ref(false)
  const sortBy = ref('text_quantity_desc')
  const perPage = ref(20)
  const page = ref(1)

  const products = computed(() => list.value)

  async function fetchProducts() {
    loading.value = true
    const filtersStore = useFiltersStore()
    try {
      const params = {
        sort: sortBy.value,
        perPage: perPage.value,
        page: page.value,
        ...filtersStore.queryParams,
      }
      const data = await useApiWithFallback(
        () => getProducts(params),
        'products.json',
        isValidProductResponse
      )

      const rawList =   (Array.isArray(data.results) ? data.results : [])
    
      list.value = rawList
      total.value = data?.total_items ?? rawList.length
    } finally {
      loading.value = false
    }
  }

  function setSort(value) {
    sortBy.value = value
  }

  function setPerPage(value) {
    perPage.value = value
    page.value = 1
  }

  function setPage(value) {
    page.value = value
  }

  return {
    list,
    total,
    loading,
    sortBy,
    perPage,
    page,
    products,
    fetchProducts,
    setSort,
    setPerPage,
    setPage,
  }
})
