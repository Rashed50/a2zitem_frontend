/**
 * Query parameter names for GET /v1/product/customer/product-list/
 * Override in .env if your backend uses different keys (restart dev server after change).
 */
const env = import.meta.env

export const productListQueryKeys = {
  sort: env.VITE_API_PRODUCT_SORT_PARAM || 'sort',
  page: env.VITE_API_PRODUCT_PAGE_PARAM || 'page',
  page_size: env.VITE_API_PRODUCT_PAGE_SIZE_PARAM || 'page_size',
  priceMin: env.VITE_API_PRODUCT_PRICE_MIN_PARAM || 'priceMin',
  priceMax: env.VITE_API_PRODUCT_PRICE_MAX_PARAM || 'priceMax',
  /** Query key; values are strings like `in_stock`, `out_of_stock` (see filters store). */
  availability: env.VITE_API_PRODUCT_AVAILABILITY_PARAM || 'availability',
  subcategories: env.VITE_API_PRODUCT_SUBCATEGORIES_PARAM || 'subcategories',
  // Force brand query key to 'brand_id' by default
  brandId: env.VITE_API_PRODUCT_BRAND_PARAM || 'brand_id',
  // Force category query key to 'category_id' by default
  category: env.VITE_API_PRODUCT_CATEGORY_PARAM || 'category_id',
}
