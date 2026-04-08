import apiClient from './apiClient'

export async function getProducts(params = {}) {
  return apiClient.get('/v1/product/customer/product-list/?', { params })
  //return apiClient.get('/products', { params })
}

export async function getProductById(id) {
    return apiClient.get(`/v1/product/customer/product-details/${id}/`)
   
}
