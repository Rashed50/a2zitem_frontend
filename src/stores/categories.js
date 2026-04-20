import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiWithFallback } from '@/composables/useApiWithFallback'
import { getCategories } from '@/services/categoryService'
import { isValidCategoriesResponse } from '@/utils/validators'

function normalizeCategoryList(data) {
  const raw = Array.isArray(data)
    ? data
    : data?.results ?? data?.data ?? data?.categories ?? data?.list ?? []
  if (!Array.isArray(raw)) return []
  return raw.map((item) => {
    if (typeof item === 'string') {
      const name = item
      const id = name.toString().toLowerCase().replace(/\s+/g, '-')
      return { id, name }
    }
    if (item && typeof item === 'object') {
      const name = item.name ?? item.title ?? item.label ?? String(item.id ?? '')
      const id = item.id ?? name.toString().toLowerCase().replace(/\s+/g, '-')
      // preserve original fields but ensure id and name exist
      return { ...item, id, name }
    }
    const name = String(item)
    const id = name.toString().toLowerCase().replace(/\s+/g, '-')
    return { id, name }
  }).filter(Boolean)
}

export const useCategoryStore = defineStore('categories', () => {
  const list = ref([])
  const loading = ref(false)

  const categories = computed(() => list.value)

  async function fetchCategories() {
    loading.value = true
    try {
      const data = await useApiWithFallback(
        () => getCategories(),
        'categories.json',
        isValidCategoriesResponse
      )
      list.value = normalizeCategoryList(data)
    } finally {
      loading.value = false
    }
  }

  return { list, loading, categories, fetchCategories }
})
