/** Normalize category label from API (string or { name }) or mock (string). */
export function getCategoryLabel(category) {
  if (category == null) return ''
  if (typeof category === 'string') return category
  if (typeof category === 'object') return category.name ?? category.title ?? ''
  return String(category)
}

export function getProductDisplayName(product) {
  if (!product) return ''
  return product.name ?? product.title ?? 'Product'
}

export function getProductImageUrl(product) {
  if (!product) return ''
  const imgs = product.images
  if (Array.isArray(imgs) && imgs.length > 0 && imgs[0]?.image) {
    return imgs[0].image
  }
  if (typeof product.image === 'string') return product.image
  return ''
}

export function getProductUnitPrice(product) {
  if (!product) return null
  const v = product.variants?.[0]?.selling_price
  if (v != null && v !== '') return v
  return product.price ?? product.priceFormatted ?? null
}
