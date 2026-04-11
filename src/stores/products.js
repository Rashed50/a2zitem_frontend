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
  const perPage = ref(50)
  const page = ref(1)

 // const products = computed(() => list.value)

  // Enhanced computed property to handle sorting logic
  const products = computed(() => {
    // Create a copy to avoid mutating the original 'list' ref
    const sortedList = [...list.value]

    // 2. Apply sorting logic base on price asscending order 
    if (sortBy.value === 'price_asc') {
      return sortedList.sort((a, b) => {
        const priceA = parseFloat(a.variants[0]?.selling_price || 0)
        const priceB = parseFloat(b.variants[0]?.selling_price || 0)
        return priceA - priceB
      })
    }
    console.log('from product.js Sorting by:', sortBy.value);

     if (sortBy.value === 'price_desc') {
      return sortedList.sort((a, b) => {
        const priceA = parseFloat(a.variants[0]?.selling_price || 0)
        const priceB = parseFloat(b.variants[0]?.selling_price || 0)
        return priceB - priceA
      })
    }
  
   else if (sortBy.value === 'text_quantity_desc') {
      return sortedList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } 
    
    else if (sortBy.value === 'newest') {
      // Sort by created_at in asscending order (old first)
      return sortedList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    }

    // Default return if no specific date sort is active
    return sortedList
  })


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
      total.value = data.total_items
    } finally {
      loading.value = false
    }
  }

  // Actions to update sorting changed from sort by menu
  function setSort(value) {
   
    sortBy.value = value
    console.log('Sort by changed to:', value);
    // If you want to sort locally without refetching from the server, 
    // the computed property 'products' will handle it automatically.
    // If you want to fetch new sorted data from the DB, call:
   //  fetchProducts()
    
  }

  // Action to update items per page called from pagination controls
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
