import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiWithFallback } from '@/composables/useApiWithFallback'
import { getProducts } from '@/services/productService'
import { isValidProductResponse } from '@/utils/validators'
import { useFiltersStore } from './filters'

function extractProductList(data) {
  if (Array.isArray(data)) return data
  if (data?.results && Array.isArray(data.results)) return data.results
  return data?.data ?? data?.items ?? data?.list ?? []
}

function extractTotal(data, listLength) {
  return (
    data?.total_items ??
    data?.total ??
    data?.count ??
    listLength
  )
}

export const useProductsStore = defineStore('products', () => {
  const list = ref([])
  const total = ref(0)
  const loading = ref(false)
  const sortBy = ref('text_quantity_desc')
  const perPage = ref(50)
  const page = ref(1)

  const products = computed(() => {
    const sortedList = [...list.value]

    if (sortBy.value === 'price_asc') {
      return sortedList.sort((a, b) => {
        const priceA = parseFloat(a.variants?.[0]?.selling_price ?? a.price ?? 0)
        const priceB = parseFloat(b.variants?.[0]?.selling_price ?? b.price ?? 0)
        return priceA - priceB
      })
    }
    if (sortBy.value === 'price_desc') {
      return sortedList.sort((a, b) => {
        const priceA = parseFloat(a.variants?.[0]?.selling_price ?? a.price ?? 0)
        const priceB = parseFloat(b.variants?.[0]?.selling_price ?? b.price ?? 0)
        return priceB - priceA
      })
    }
    if (sortBy.value === 'text_quantity_desc') {
      return sortedList.sort(
        (a, b) => new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0)
      )
    }
    if (sortBy.value === 'newest') {
      return sortedList.sort(
        (a, b) => new Date(a.created_at ?? 0) - new Date(b.created_at ?? 0)
      )
    }
    return sortedList
  })

  async function fetchProducts() {
    loading.value = true
    const filtersStore = useFiltersStore()
    try {
      const filterPayload = {
        sort: sortBy.value,
        perPage: perPage.value,
        page: page.value,
        ...filtersStore.queryParams,
      }
      const data = await useApiWithFallback(
        () => getProducts(filterPayload),
        'products.json',
        isValidProductResponse
      )
      const rawList = extractProductList(data)
      list.value = rawList
      total.value = extractTotal(data, rawList.length)
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
