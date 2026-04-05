import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiWithFallback } from '@/composables/useApiWithFallback'
import { getCategories } from '@/services/categoryService'
import { isValidCategoriesResponse } from '@/utils/validators'

export const useCategoryStore = defineStore('categories', () => {
  const list = ref([])
  const loading = ref(false)

  const categories = computed(() => list.value)

  async function fetchCategories() {
    loading.value = true
    
    console.log('Fetching categories...');
 
    try {
      const data = await useApiWithFallback(
        () => getCategories(),
        'categories.json',
        isValidCategoriesResponse
      )
      console.log('Categories response:', data);
      const categories = data.results //.map(item => item.name);
   //   const raw = Array.isArray(data) ? data : data?.data ?? data?.categories ?? []
      list.value = categories
    } finally {
      loading.value = false
    }
  }

  return { list, loading, categories, fetchCategories }
})
