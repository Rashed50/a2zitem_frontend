import apiClient from './apiClient'

export async function getCategories() {
  return apiClient.get('/v1/product-attributes/category/mini-list/') ///v1/product-attributes/category/mini-list/
}
