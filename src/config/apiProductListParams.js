/**
 * Query parameter names for GET /v1/product/customer/product-list/
 * Override in .env if your backend uses different keys (restart dev server after change).
 */
const env = import.meta.env

export const productListQueryKeys = {
  sort: env.VITE_API_PRODUCT_SORT_PARAM || 'ordering',
  page: env.VITE_API_PRODUCT_PAGE_PARAM || 'page',
  page_size: env.VITE_API_PRODUCT_PAGE_SIZE_PARAM || 'page_size',
  priceMin: env.VITE_API_PRODUCT_PRICE_MIN_PARAM || 'min_price',
  priceMax: env.VITE_API_PRODUCT_PRICE_MAX_PARAM || 'max_price',
  availability: env.VITE_API_PRODUCT_AVAILABILITY_PARAM || 'in_stock',
  subcategories: env.VITE_API_PRODUCT_SUBCATEGORIES_PARAM || 'sub_category_id',
  brandId: env.VITE_API_PRODUCT_BRAND_PARAM || 'brand_id',
  category: env.VITE_API_PRODUCT_CATEGORY_PARAM || 'category_id',
  search: env.VITE_API_PRODUCT_SEARCH_PARAM || 'search',
}
