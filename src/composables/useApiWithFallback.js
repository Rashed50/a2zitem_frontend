const mockModules = {
  'products.json': () => import('@/mock/products.json'),
  'banners.json': () => import('@/mock/banners.json'),
  'categories.json': () => import('@/mock/categories.json'),
  'filters.json': () => import('@/mock/filters.json'),
}

/**
 * Tries API call; validates response; on failure loads mock JSON and returns.
 * @param {() => Promise<any>} apiCall - function that returns the API promise
 * @param {string} mockPath - key in mockModules (e.g. 'products.json')
 * @param {(data: any) => boolean} validate - validator; return true if response is valid
 * @returns {Promise<any>} - resolved with API data or mock data
 */
export async function useApiWithFallback(apiCall, mockPath, validate) {
  try {
    const response = await apiCall()
    return response;
   
    if (validate(response)) {
      return response
    }
  } catch (_) {
    // API failed or timed out – fall through to mock
  }
  // const loader = mockModules[mockPath]
  // if (!loader) throw new Error(`Unknown mock path: ${mockPath}`)
  // const mockModule = await loader()
  // return mockModule.default
}
