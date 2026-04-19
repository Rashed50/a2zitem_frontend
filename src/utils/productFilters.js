/**
 * Read numeric price from API-shaped or mock-shaped product.
 */
export function getProductPrice(product) {
  if (!product || typeof product !== 'object') return null
  const v = product.variants?.[0]?.selling_price
  if (v != null && v !== '') return Number(v)
  if (product.price != null) return Number(product.price)
  if (product.priceFormatted != null) return Number(String(product.priceFormatted).replace(/[^\d.]/g, ''))
  return null
}

export function getProductBrandId(product) {
  if (!product || typeof product !== 'object') return null
  const b = product.brand
  if (b && typeof b === 'object' && b.id != null) return b.id
  if (product.brand_id != null) return product.brand_id
  return null
}

export function getProductBrandName(product) {
  if (!product || typeof product !== 'object') return ''
  const b = product.brand
  if (b && typeof b === 'object') return String(b.name ?? b.title ?? '')
  if (typeof b === 'string') return b
  return String(product.brand_name ?? '')
}

/** True if product counts as in stock for filters */
export function isProductInStock(product) {
  if (product?.inStock === false) return false
  const qty =
    product?.variants?.[0]?.stock ??
    product?.variants?.[0]?.quantity ??
    product?.stock ??
    product?.quantity
  if (qty != null) return Number(qty) > 0
  if (product?.inStock === true) return true
  return true
}

/**
 * Client-side filter (used after fetch so mock + misconfigured API still behave).
 * @param {object} query - filters store queryParams shape
 */
export function applyProductFilters(products, query) {
  if (!Array.isArray(products) || !query) return []
  const priceMin = Number(query.priceMin ?? 0)
  const priceMax = Number(query.priceMax ?? Number.MAX_SAFE_INTEGER)
  const availability = query.availability ?? 'in_stock'
  const brandIds = Array.isArray(query.brands) ? query.brands.filter((x) => x != null && x !== '') : []

  const listHasBrandMeta = products.some(
    (p) => getProductBrandId(p) != null || getProductBrandName(p) !== ''
  )

  return products.filter((p) => {
    const price = getProductPrice(p)
    if (price != null && !Number.isNaN(price)) {
      if (price < priceMin || price > priceMax) return false
    }

    if (availability === 'in_stock' && !isProductInStock(p)) return false
    if (availability === 'out_of_stock' && isProductInStock(p)) return false

    if (brandIds.length > 0) {
      if (!listHasBrandMeta) {
        return true
      }
      const pid = getProductBrandId(p)
      if (pid != null && brandIds.some((id) => String(id) === String(pid))) {
        return true
      }
      const pname = getProductBrandName(p).toLowerCase()
      if (pname) {
        const matchesName = brandIds.some((id) => {
          const s = String(id).toLowerCase()
          return pname.includes(s) || s.includes(pname)
        })
        if (matchesName) return true
      }
      return false
    }

    return true
  })
}
