import { ref, watch } from 'vue'
import { useApiWithFallback } from './useApiWithFallback'
import {
  getProductById,
  isValidProductDetailResponse,
  normalizeProductDetail,
} from '@/services/productService'

export function useProductDetail(idRef) {
  const product = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchProduct(id) {
    if (!id) {
      product.value = null
      return
    }
    loading.value = true
    error.value = null
    try {
      const data = await useApiWithFallback(
        () => getProductById(id),
        'products.json',
        isValidProductDetailResponse
      )
      product.value = normalizeProductDetail(data, id)
    } catch (e) {
      error.value = e?.message ?? 'Failed to load product'
      product.value = null
    } finally {
      loading.value = false
    }
  }

  if (typeof idRef === 'function' || (idRef && typeof idRef.value !== 'undefined')) {
    const getId = () => (typeof idRef === 'function' ? idRef() : idRef.value)
    watch(
      () => getId(),
      (id) => fetchProduct(id),
      { immediate: true }
    )
  } else {
    fetchProduct(idRef)
  }

  return { product, loading, error, fetchProduct }
}
