<script setup>
const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
  { to: '/contact', label: 'Contact Us' },
]
</script>

<template>
  <nav class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6" aria-label="Site pages">
    <router-link
      v-for="item in links"
      :key="item.to"
      :to="item.to"
      class="text-sm font-medium text-white/90 hover:text-white transition-colors"
      active-class="text-white underline"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>
