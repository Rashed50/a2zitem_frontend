import { productListQueryKeys as K } from '@/config/apiProductListParams'

/**
 * Maps Pinia filter + pagination state → flat query object for the product list API.
 * All filtering is intended to happen on the server; adjust keys via
 * `src/config/apiProductListParams.js` or VITE_API_PRODUCT_* env vars.
 */
export function buildProductListParams(state = {}) {
  const {
    sort,
    page_size,
    priceMin,
    priceMax,
    availability,
    subcategories,
    brands,
    category,
  } = state

  const params = {}

  if (sort != null && sort !== '') params[K.sort] = sort
  if (page_size != null && page_size !== '') params[K.page_size] = page_size

  if (category != null && category !== '') {
    params[K.category] = typeof category === 'object' ? category.id ?? category.slug : category
  }

  if (priceMin != null && priceMin !== '') {
    params[K.priceMin] = priceMin
  }
  if (priceMax != null && priceMax !== '') {
    params[K.priceMax] = priceMax
  }

  if (availability === 'in_stock' || availability === 'out_of_stock') {
    params[K.availability] = availability
  }

  if (Array.isArray(subcategories) && subcategories.length > 0) {
    params[K.subcategories] = subcategories.join(',')
  }

  if (Array.isArray(brands) && brands.length > 0) {
    const id = brands[0]
    if (id != null && id !== '') {
      params[K.brandId] = id
    }
  }

  return params
}
