<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.count)
const compareCount = computed(() => 0) // TODO: compare store

const chatUrl = 'https://wa.me/8801848380992'
</script>

<template>
  <div class="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
    <a
      :href="chatUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-gray-800 text-white shadow-lg hover:bg-gray-700 border border-gray-600"
      aria-label="Chat on WhatsApp"
    >
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      </svg>
      <span class="text-[10px] font-semibold mt-0.5">CHAT</span>
    </a>
    <!-- <router-link
      to="#compare"
      class="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-gray-800 text-white shadow-lg hover:bg-gray-700 border border-gray-600 relative"
      aria-label="Compare products"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <span class="text-[10px] font-semibold mt-0.5">COMPARE</span>
      <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-header-blue text-[10px] font-bold">
        {{ compareCount }}
      </span>
    </router-link> -->
    <router-link
      to="#"
      class="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-gray-800 text-white shadow-lg hover:bg-gray-700 border border-gray-600 relative"
      aria-label="Cart"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span class="text-[10px] font-semibold mt-0.5">CART</span>
      <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-header-blue text-[10px] font-bold">
        {{ cartCount }}
      </span>
    </router-link>
  </div>
</template>
