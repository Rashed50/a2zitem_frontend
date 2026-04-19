/**
 * Response validators for API fallback logic.
 * Supports common shapes: plain arrays, { data }, { results } (Django REST), { items }, { list }.
 */

function extractList(data) {
  if (data == null) return null
  if (Array.isArray(data)) return data
  if (typeof data !== 'object') return null
  const list =
    data.results ??
    data.data ??
    data.items ??
    data.list ??
    data.categories ??
    data.products
  if (Array.isArray(list)) return list
  if (Array.isArray(data.data) && data.data.length) return data.data
  return null
}

export function isValidListResponse(data) {
  const list = extractList(data)
  return Array.isArray(list) && list.length > 0
}

function firstProductShape(item) {
  if (!item || typeof item !== 'object') return false
  const hasId = item.id != null
  const hasName = item.name != null || item.title != null
  const hasPrice =
    item.price != null ||
    item.priceFormatted != null ||
    item.selling_price != null ||
    item.variants?.[0]?.selling_price != null
  return (hasId || hasName) && hasPrice
}

export function isValidProductResponse(data) {
  if (data == null || typeof data !== 'object') return false
  const list = extractList(data)
  if (!Array.isArray(list)) return false
  if (list.length === 0) {
    return (
      data.success === true ||
      data.total_items != null ||
      data.pagination != null
    )
  }
  return firstProductShape(list[0])
}

export function isValidBannerResponse(data) {
  if (data == null || typeof data !== 'object') return false
  const list = Array.isArray(data)
    ? data
    : data.results ?? data.data ?? data.slides ?? data.banners ?? data.items
  return Array.isArray(list) && list.length > 0
}

export function isValidCategoriesResponse(data) {
  const list = extractList(data)
  if (!Array.isArray(list) || list.length === 0) return false
  const first = list[0]
  if (typeof first === 'string') return true
  if (first && typeof first === 'object') {
    return first.name != null || first.title != null || first.id != null
  }
  return false
}

export function isValidFiltersResponse(data) {
  if (data == null || typeof data !== 'object') return false
  return true
}

function extractBrandMiniList(data) {
  if (data == null) return null
  if (Array.isArray(data)) return data
  if (typeof data !== 'object') return null
  const list = data.results ?? data.data ?? data.items ?? data.brands
  return Array.isArray(list) ? list : null
}

/** Brand mini-list: `{ success, results: [{ id, name, logo? }] }` or legacy shapes. */
export function isValidBrandMiniListResponse(data) {
  const list = extractBrandMiniList(data)
  if (!Array.isArray(list)) return false
  if (list.length === 0) {
    return data.success === true || data.total_items != null
  }
  const first = list[0]
  return typeof first === 'object' && (first.id != null || first.name != null)
}
