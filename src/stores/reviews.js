import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useReviewsStore = defineStore('reviews', () => {
  const byProductId = ref({})

  function getReviews(productId) {
    return byProductId.value[productId] ?? []
  }

  const getReviewsForProduct = (productId) => computed(() => getReviews(productId))

  function addReview(productId, review) {
    const list = byProductId.value[productId] ?? []
    const newReview = {
      id: `${productId}-${Date.now()}`,
      productId,
      authorName: review.authorName || 'Anonymous',
      rating: review.rating ?? 0,
      text: review.text || '',
      videoUrl: review.videoUrl ?? null,
      imageUrls: review.imageUrls ?? [],
      createdAt: new Date().toISOString(),
    }
    byProductId.value[productId] = [...list, newReview]
    return newReview
  }

  return { byProductId, getReviews, getReviewsForProduct, addReview }
})
