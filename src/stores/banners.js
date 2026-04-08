import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiWithFallback } from '@/composables/useApiWithFallback'
import { getBanners } from '@/services/bannerService'
import { isValidBannerResponse } from '@/utils/validators'
  // Import the JSON directly
  import sliderData from '../mock/banners.json'

export const useBannersStore = defineStore('banners', () => {
  const list = ref([])
  const loading = ref(false)
  // const slides = computed(() => list.value)

  // Access the 'data' array from your JSON structure
  const slides = ref(sliderData.data)
  list.value = slides.value

  async function fetchBanners() {
    loading.value = true
    console.log(slides.value);
 
    try {

      list.value = slides.value
      // const data = await useApiWithFallback(
      //   () => getBanners(),
      //   'banners.json',
      //   isValidBannerResponse
      // )     

      // const raw = Array.isArray(data) ? data : data?.data ?? data?.slides ?? []
      // list.value = raw
    } finally {
      loading.value = false
    }
  }

  return { list, loading, slides, fetchBanners }
})
