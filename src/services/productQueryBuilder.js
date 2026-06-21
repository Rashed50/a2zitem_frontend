import { productListQueryKeys as K } from '@/config/apiProductListParams'

/**
 * Maps Pinia filter + pagination state → flat query object for the product list API.
 */
export function buildProductListParams(state = {}) {
  const {
    sort,
    page_size,
    page,
    priceMin,
    priceMax,
    availability,
    subcategories,
    brands,
    category,
    search,
  } = state

  const params = {}

  if (sort != null && sort !== '') params[K.sort] = sort
  if (page_size != null && page_size !== '') params[K.page_size] = page_size
  if (page != null && page !== '') params[K.page] = page

  if (category != null && category !== '') {
    const catId = typeof category === 'object' ? (category.id ?? category.slug ?? category.name ?? '') : category
    if (catId !== '') params[K.category] = catId
  }

  if (priceMin != null && priceMin !== '') {
    params[K.priceMin] = priceMin
  }
  if (priceMax != null && priceMax !== '') {
    params[K.priceMax] = priceMax
  }

  if (availability === 'in_stock' || availability === 'out_of_stock') {
    params[K.availability] = availability === 'in_stock'
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

  if (search != null && search !== '') {
    params[K.search] = search
  }

  return params
}
