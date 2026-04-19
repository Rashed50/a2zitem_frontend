import apiClient from './apiClient'
import { buildProductListParams } from './productQueryBuilder'

export async function getProducts(filterState = {}) {
  const params = buildProductListParams(filterState)
  return apiClient.get('/v1/product/customer/product-list/', { params })
}

/**
 * True if JSON is usable for product detail (a2z: `{ success, results: { id, name } }` or legacy / mock).
 */
export function isValidProductDetailResponse(data) {
  if (data == null || typeof data !== 'object') return false
  const p = data.results ?? data.data ?? data
  if (p == null || typeof p !== 'object') return false
  if (Array.isArray(p)) {
    if (p.length === 0) return false
    const first = p[0]
    return first.id != null || first.name != null || first.title != null
  }
  return p.id != null || p.name != null || p.title != null
}

/**
 * Single product from GET .../product-details/:id/ (`results` object) or list / mock shapes.
 * @param {object} data - parsed response body
 * @param {string|number} [id] - route id when `results` is an array
 */
export function normalizeProductDetail(data, id) {
  if (data == null) return null
  const sid = id != null && id !== '' ? String(id) : ''

  const results = data.results
  if (results != null && typeof results === 'object') {
    if (!Array.isArray(results)) return results
    if (results.length === 0) return null
    return results.find((p) => String(p?.id) === sid) ?? results[0] ?? null
  }

  if (data.data != null && typeof data.data === 'object' && !Array.isArray(data.data)) {
    return data.data
  }

  const list = Array.isArray(data) ? data : data?.data ?? data?.items ?? data?.list
  if (Array.isArray(list) && list.length > 0) {
    return list.find((p) => String(p?.id) === sid) ?? list[0] ?? null
  }
  return null
}

export async function getProductById(id) {
  return apiClient.get(`/v1/product/customer/product-details/${id}/`)
}
