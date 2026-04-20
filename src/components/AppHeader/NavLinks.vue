<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { useFiltersStore } from '@/stores/filters'
import { useProductsStore } from '@/stores/products'

const categoryStore = useCategoryStore()
const filtersStore = useFiltersStore()
const productsStore = useProductsStore()
// categories now are objects { id, name, ... }
const categories = computed(() => categoryStore.list)

defineProps({
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const scrollRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const scrollAmount = 240

function updateScrollState() {
  const el = scrollRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 1
}

function scrollLeft() {
  const el = scrollRef.value
  if (el) {
    el.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }
}

function scrollRight() {
  const el = scrollRef.value
  if (el) {
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

function onScroll() {
  updateScrollState()
}

function onCategoryClick(cat) {
  // compute id string to use as fallback
  const catId = typeof cat === 'string'
    ? cat
    : (cat && typeof cat === 'object' ? (cat.id ?? cat.slug ?? cat.name ?? '') : String(cat ?? ''))

  // Try to use the store setter if present (preferred). Fallback to directly assigning the category state
  if (filtersStore && typeof filtersStore.setCategory === 'function') {
    filtersStore.setCategory(cat)
  } else if (filtersStore && 'category' in filtersStore) {
    // direct assignment (handles older or stale store shapes)
    try {
      filtersStore.category = catId
    } catch (e) {
      // some store proxies may prevent direct assignment; warn for debugging
      // eslint-disable-next-line no-console
      console.warn('Failed to assign filtersStore.category directly', e, filtersStore)
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('filtersStore.setCategory not available and filtersStore.category missing', filtersStore)
  }

  // reset to first page and fetch products with new filters
  productsStore.setPage(1)
  productsStore.fetchProducts()
}

watch(categories, () => {
  setTimeout(updateScrollState, 0)
}, { immediate: true })

onMounted(() => {
  setTimeout(updateScrollState, 100)
})
</script>

<template>
  <div class="relative">
    <!-- Mobile: overlay and drawer -->
    <button
      v-if="isOpen"
      type="button"
      class="fixed inset-0 z-10 bg-black/30 lg:hidden"
      aria-label="Close menu"
      @click="emit('close')"
    />
    <template v-if="isOpen">
      <ul
        class="fixed left-0 top-0 z-20 h-full w-64 flex flex-col gap-4 bg-white p-4 pt-16 shadow-xl overflow-y-auto"
      >
        <li v-for="cat in categories" :key="typeof cat === 'string' ? cat : cat.id">
          <a
            href="#"
            @click.prevent="() => { onCategoryClick(cat); emit('close') }"
            class="block py-1 hover:underline"
          >
            {{ typeof cat === 'string' ? cat : cat.name || cat.id }}
          </a>
        </li>
      </ul>
    </template>

    <!-- Desktop: horizontally scrollable with arrows -->
    <template v-else>
      <div class="relative flex items-center -mx-2">
        <button
          type="button"
          class="shrink-0 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-header-blue hover:bg-gray-50 transition-opacity"
          :class="canScrollLeft ? 'opacity-100' : 'opacity-40 pointer-events-none'"
          aria-label="Scroll categories left"
          @click="scrollLeft"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <ul
          ref="scrollRef"
          class="flex flex-nowrap gap-x-4 py-3 px-2 text-sm font-medium overflow-x-auto scroll-smooth"
          style="scrollbar-width: thin; -ms-overflow-style: scrollbar;"
          @scroll="onScroll"
        >
          <li
            v-for="cat in categories"
            :key="typeof cat === 'string' ? cat : cat.id"
            class="shrink-0"
          >
            <a
              href="#"
              @click.prevent="() => onCategoryClick(cat)"
              class="block py-1 hover:underline whitespace-nowrap"
            >
              {{ typeof cat === 'string' ? cat : cat.name }}
            </a>
          </li>
        </ul>
        <button
          type="button"
          class="shrink-0 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-header-blue hover:bg-gray-50 transition-opacity"
          :class="canScrollRight ? 'opacity-100' : 'opacity-40 pointer-events-none'"
          aria-label="Scroll categories right"
          @click="scrollRight"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>
