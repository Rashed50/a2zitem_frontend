<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import TopBar from './TopBar.vue'
import DefaultPagesNav from './DefaultPagesNav.vue'
import NavLinks from './NavLinks.vue'
import HeaderActions from './HeaderActions.vue'

const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const cartCount = computed(() => cartStore.count)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header>
    <TopBar />
    <div class="bg-header-blue text-white">
    <!-- Top bar: logo, search, actions -->
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <router-link to="/" class="flex items-center gap-2 shrink-0" aria-label="Datatech Home">
          <span class="text-xl font-bold">Datatech</span>
        </router-link>

        <div class="hidden md:flex flex-1 justify-center mx-4">
          <DefaultPagesNav />
        </div>

        <div class="flex items-center gap-2">
          <HeaderActions :cart-count="cartCount" />
          <button
            type="button"
            class="lg:hidden p-2 rounded hover:bg-white/10"
            aria-label="Toggle menu"
            @click="toggleMobileMenu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile: default pages links -->
      <div class="md:hidden mt-2">
        <DefaultPagesNav />
      </div>
    </div>

    <!-- Navigation: categories -->
    <nav class="bg-white text-header-blue border-b border-gray-200">
      <div class="container mx-auto px-4">
        <NavLinks
          :is-open="mobileMenuOpen"
          @close="closeMobileMenu"
        />
      </div>
    </nav>
    </div>
  </header>
</template>
