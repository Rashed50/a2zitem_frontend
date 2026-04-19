import { ref, watch } from 'vue'
import { useApiWithFallback } from './useApiWithFallback'
import { getProducts } from '@/services/productService'
import { isValidProductResponse } from '@/utils/validators'
import { getCategoryLabel } from '@/utils/productDisplay'

function extractProductList(data) {
  if (Array.isArray(data)) return data
  if (data?.results && Array.isArray(data.results)) return data.results
  return data?.data ?? data?.items ?? data?.list ?? []
}

export function useRelatedProducts(categoryRef, excludeIdRef) {
  const products = ref([])
  const loading = ref(false)

  async function fetchRelated(category, excludeId) {
    if (!category) {
      products.value = []
      return
    }
    loading.value = true
    try {
      const data = await useApiWithFallback(
        () => getProducts({ category }),
        'products.json',
        isValidProductResponse
      )
      const list = extractProductList(data)
      const exclude = excludeId != null ? String(excludeId) : null
      const cat = String(category).toLowerCase()
      products.value = list.filter((p) => {
        const pCat = getCategoryLabel(p.category).toLowerCase()
        const sameCategory = pCat && pCat === cat
        const notCurrent = String(p.id) !== exclude
        return sameCategory && notCurrent
      })
    } catch (_) {
      products.value = []
    } finally {
      loading.value = false
    }
  }

  watch(
    () => [categoryRef?.value ?? categoryRef, excludeIdRef?.value ?? excludeIdRef],
    ([category, excludeId]) => fetchRelated(category, excludeId),
    { immediate: true }
  )

  return { products, loading, fetchRelated }
}
