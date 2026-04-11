import { ref, watch } from 'vue'
import { useApiWithFallback } from './useApiWithFallback'
import { getProductById } from '@/services/productService'
import axios from 'axios'

function isValidProductDetail(data) {
  if (data == null || typeof data !== 'object') return false
  const p = data?.data ?? data
  return p && (p.id != null || p.name != null)
}

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
       // () => false
      )

      console.log('Fetched product data:', data.results)
      product.value =data.results // found ?? null
    } catch (e) {
      error.value = e?.message ?? 'Failed to load product'
      product.value = null
    } finally {
      loading.value = false
    }

    //   try {
    //       // const data = await axios.get(`https://a2zbackend.a2zitem.com/api/v1/product/customer/product-details/${id}/`)
    //          const data = await axios.get(`http://localhost:8000/api/v1/product/customer/product-details/${id}/`)
    //  console.log('Fetched product data:', data.data)
    //  product.value = data.results // found ?? null 
     
    // } catch (e) {
    //   error.value = e?.message ?? 'Failed to load product'
    //   product.value = null
    // } finally {
    //   loading.value = false
    // }


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
