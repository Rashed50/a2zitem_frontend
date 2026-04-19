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
    if (typeof item === 'string') return item
    if (item && typeof item === 'object') {
      return item.name ?? item.title ?? item.label ?? String(item.id ?? '')
    }
    return String(item)
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
