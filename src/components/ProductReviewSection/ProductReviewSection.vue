<script setup>
import { ref, computed, watch } from 'vue'
import { useReviewsStore } from '@/stores/reviews'

const props = defineProps({
  productId: { type: [String, Number], required: true },
})

const reviewsStore = useReviewsStore()
const reviews = computed(() => {
  const list = reviewsStore.byProductId[props.productId] ?? []
  return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const authorName = ref('')
const rating = ref(0)
const text = ref('')
const videoFile = ref(null)
const imageFiles = ref([])
const videoPreviewUrl = ref(null)
const imagePreviewUrls = ref([])
const submitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

const hoverRating = ref(0)
const displayRating = computed(() => hoverRating.value || rating.value)

function setRating(value) {
  rating.value = value
}

function onVideoChange(e) {
  const file = e.target.files?.[0]
  if (videoPreviewUrl.value) URL.revokeObjectURL(videoPreviewUrl.value)
  videoPreviewUrl.value = null
  videoFile.value = null
  if (file && file.type.startsWith('video/')) {
    videoFile.value = file
    videoPreviewUrl.value = URL.createObjectURL(file)
  }
  e.target.value = ''
}

function removeVideo() {
  if (videoPreviewUrl.value) URL.revokeObjectURL(videoPreviewUrl.value)
  videoPreviewUrl.value = null
  videoFile.value = null
}

function onImagesChange(e) {
  const files = [...(e.target.files ?? [])].filter((f) => f.type.startsWith('image/'))
  imagePreviewUrls.value.forEach((url) => URL.revokeObjectURL(url))
  const newUrls = files.map((f) => URL.createObjectURL(f))
  imageFiles.value = [...imageFiles.value, ...files]
  imagePreviewUrls.value = [...imagePreviewUrls.value, ...newUrls]
  e.target.value = ''
}

function removeImage(index) {
  URL.revokeObjectURL(imagePreviewUrls.value[index])
  imagePreviewUrls.value.splice(index, 1)
  imageFiles.value.splice(index, 1)
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' })
  } catch {
    return iso
  }
}

async function onSubmit() {
  submitError.value = ''
  submitSuccess.value = false
  const hasText = text.value.trim().length > 0
  const hasVideo = !!videoFile.value
  const hasImages = imageFiles.value.length > 0
  if (!hasText && !hasVideo && !hasImages) {
    submitError.value = 'Please add some text, a video, or at least one image.'
    return
  }

  submitting.value = true
  try {
    const videoUrl = videoPreviewUrl.value || null
    const imageUrls = [...imagePreviewUrls.value]
    reviewsStore.addReview(props.productId, {
      authorName: authorName.value.trim() || 'Anonymous',
      rating: rating.value,
      text: text.value.trim(),
      videoUrl,
      imageUrls,
    })
    authorName.value = ''
    rating.value = 0
    text.value = ''
    removeVideo()
    imagePreviewUrls.value.forEach((url) => URL.revokeObjectURL(url))
    imagePreviewUrls.value = []
    imageFiles.value = []
    submitSuccess.value = true
    setTimeout(() => { submitSuccess.value = false }, 3000)
  } finally {
    submitting.value = false
  }
}

watch(() => props.productId, () => {
  submitError.value = ''
  submitSuccess.value = false
})
</script>

<template>
  <div class="mt-12 pt-8 border-t border-gray-200">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

    <!-- Review form -->
    <div class="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-8">
      <h3 class="font-semibold text-gray-900 mb-4">Write a review</h3>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="review-author" class="block text-sm font-medium text-gray-700 mb-1">Your name (optional)</label>
          <input
            id="review-author"
            v-model="authorName"
            type="text"
            class="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-header-blue focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">Rating (optional)</span>
          <div class="flex gap-1">
            <button
              v-for="n in 5"
              :key="n"
              type="button"
              class="p-1 focus:outline-none"
              @click="setRating(n)"
              @mouseenter="hoverRating = n"
              @mouseleave="hoverRating = 0"
            >
              <svg
                class="w-8 h-8"
                :class="n <= displayRating ? 'text-amber-400' : 'text-gray-300'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <label for="review-text" class="block text-sm font-medium text-gray-700 mb-1">Your review</label>
          <textarea
            id="review-text"
            v-model="text"
            rows="4"
            class="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-header-blue focus:border-transparent"
            placeholder="Share your experience with this product..."
          />
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Short video (optional)</label>
            <input
              type="file"
              accept="video/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-header-blue file:text-white file:cursor-pointer hover:file:bg-blue-800"
              @change="onVideoChange"
            />
            <div v-if="videoPreviewUrl" class="mt-2 relative inline-block">
              <video
                :src="videoPreviewUrl"
                controls
                class="max-h-40 rounded border border-gray-200"
              />
              <button
                type="button"
                class="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center hover:bg-red-600"
                aria-label="Remove video"
                @click="removeVideo"
              >
                ×
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Images (optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-header-blue file:text-white file:cursor-pointer hover:file:bg-blue-800"
              @change="onImagesChange"
            />
            <div v-if="imagePreviewUrls.length" class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(url, i) in imagePreviewUrls"
                :key="i"
                class="relative"
              >
                <img :src="url" alt="Preview" class="h-20 w-20 object-cover rounded border border-gray-200" />
                <button
                  type="button"
                  class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                  aria-label="Remove image"
                  @click="removeImage(i)"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
        <p v-if="submitError" class="text-sm text-red-600">{{ submitError }}</p>
        <p v-if="submitSuccess" class="text-sm text-green-600">Thank you! Your review has been submitted.</p>
        <button
          type="submit"
          class="px-4 py-2 bg-header-blue text-white font-medium rounded hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="submitting"
        >
          {{ submitting ? 'Submitting...' : 'Submit review' }}
        </button>
      </form>
    </div>

    <!-- Review list -->
    <div class="space-y-6">
      <p v-if="reviews.length === 0" class="text-gray-500">No reviews yet. Be the first to review!</p>
      <article
        v-for="review in reviews"
        :key="review.id"
        class="border border-gray-200 rounded-lg p-4 bg-white"
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="font-medium text-gray-900">{{ review.authorName }}</span>
          <span class="text-gray-400 text-sm">{{ formatDate(review.createdAt) }}</span>
          <div v-if="review.rating" class="flex gap-0.5 ml-auto">
            <svg
              v-for="n in 5"
              :key="n"
              class="w-4 h-4"
              :class="n <= review.rating ? 'text-amber-400' : 'text-gray-200'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <p v-if="review.text" class="text-gray-700 whitespace-pre-wrap mb-3">{{ review.text }}</p>
        <div v-if="review.videoUrl" class="mb-3">
          <video
            :src="review.videoUrl"
            controls
            class="max-h-48 rounded border border-gray-200"
          />
        </div>
        <div v-if="review.imageUrls?.length" class="flex flex-wrap gap-2">
          <img
            v-for="(url, i) in review.imageUrls"
            :key="i"
            :src="url"
            :alt="`Review image ${i + 1}`"
            class="h-24 w-24 object-cover rounded border border-gray-200 cursor-pointer"
            @click="() => {}"
          />
        </div>
      </article>
    </div>
  </div>
</template>
