<script setup>
const partners = [
   { title: 'Islami Bank','info': 'Payment partner' },
  { title: 'Dutch-Bangla Bank','info': 'Payment partner' },
  { title: 'Uttara Bank','info': 'Payment partner' },
  { title: 'South Bank','info': 'Payment partner' },
  { title: 'Agrani Bank','info': 'Payment partner' },
  { title: 'AB Bank','info': 'Payment partner' },
  { title: 'Nagad','info': 'Payment partner' },
  { title: 'bKash','info': 'Payment partner' },
  { title: 'Rocket','info': 'Payment partner' },
  { title: 'DBBL','info': 'Payment partner' },
]
</script>

<template>
  <div class="border-t border-gray-600">
    <div class="container mx-auto px-4 py-6">
      <p class="font-bold text-white text-sm uppercase mb-4">Payment Partner</p>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="p in partners"
          :key="p"
          class="px-4 py-2 rounded bg-white/10 text-gray-300 text-xs font-medium"
        >
          {{ p.title }}
          <p class="text-gray-400 text-xs">{{ p.info }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
