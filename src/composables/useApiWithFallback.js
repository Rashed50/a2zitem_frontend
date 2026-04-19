const mockModules = {
  'products.json': () => import('@/mock/products.json'),
  'banners.json': () => import('@/mock/banners.json'),
  'categories.json': () => import('@/mock/categories.json'),
  'filters.json': () => import('@/mock/filters.json'),
  'brands.json': () => import('@/mock/brands.json'),
}

/**
 * Tries API call; validates response; on failure or invalid payload loads mock JSON.
 * @param {() => Promise<any>} apiCall
 * @param {string} mockPath - key in mockModules (e.g. 'products.json')
 * @param {(data: any) => boolean} validate - return true if response is usable
 */
export async function useApiWithFallback(apiCall, mockPath, validate) {
  try {
    const response = await apiCall()
    if (response != null && validate(response)) {
      return response
    }
  } catch (_) {
    // Network error, timeout, 4xx/5xx – fall through to mock
  }
  const loader = mockModules[mockPath]
  if (!loader) {
    throw new Error(`Unknown mock path: ${mockPath}`)
  }
  const mockModule = await loader()
  return mockModule.default
}
