import apiClient from './apiClient'

/**
 * Normalize GET /v1/product-attributes/brand/mini-list/ response to `{ id, name, logo? }[]`.
 */
export function normalizeBrandMiniList(data) {
  if (data == null) return []
  if (Array.isArray(data)) return data
  if (typeof data !== 'object') return []
  const rows = data.results ?? data.data ?? data.items ?? data.brands
  return Array.isArray(rows) ? rows : []
}

export async function getBrandMiniList() {
  return apiClient.get('/v1/product-attributes/brand/mini-list/')
}
