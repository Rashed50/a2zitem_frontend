<script setup>
const items = [
  // { title: 'STORE LOCATOR', icon: 'location', text: 'Find our Stores' },
  { title: 'ONLINE ORDER', icon: 'phone', text: '+88 01848 380 992', text2: '+88 01716 950 877' },
  { title: 'DBBL', icon: 'bank', text: 'Dutch-Bangla Bank Ltd.' , text1:'Name: Md. Mohibul Islam ', text2: 'A/C No: 13710 3019 1994',
    text3: 'Branch: Savar Bazar, Dhaka',text4: 'Routing No: 090264122' },
  {title: 'IBBL', icon: 'bank', text: 'Islami Bank Bangladesh Ltd.' , text1:'Name: Md. Mohibul Islam ', text2: 'A/C No: 13002 0433 0305',
    text3: 'Branch: Savar Bazar, Dhaka',text4: 'Routing No: 125264097' },
  { title: 'bKash', icon: 'wallet', text: '01716 950 877', text2: 'Personal Account' },
  { title: 'Nagad', icon: 'wallet', text: '01716 950 877', text2: 'Personal Account' },
  { title: 'Rocket', icon: 'wallet', text: '01716 950 877', text2: 'Personal Account' },
]
</script>

<template>
  <div class="border-b border-gray-600">
    <div class="container mx-auto px-4 py-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div    v-for="(item, i) in items"  :key="i"  class="flex items-start gap-3 p-4 rounded border border-gray-600 bg-gray-800/50">
          <span v-if="item.icon === 'location'" class="shrink-0 text-gray-400 mt-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <span v-else-if="item.icon === 'bank'" class="shrink-0 text-gray-400 mt-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </span>
          <span v-else-if="item.icon === 'wallet'" class="shrink-0 text-gray-400 mt-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </span>
          <span v-else class="shrink-0 text-gray-400 mt-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </span>
          <div>
            <p class="font-bold text-white text-sm">{{ item.title }}</p>
            <p class="text-gray-400 text-sm mt-0.5">{{ item.text }}</p>
            <p v-if="item.text1" class="text-gray-400 text-sm">{{ item.text1 }}</p>
            <p v-if="item.text2" class="text-gray-400 text-sm">{{ item.text2 }}</p>
            <p v-if="item.text3" class="text-gray-400 text-sm">{{ item.text3 }}</p>
            <p v-if="item.text4" class="text-gray-400 text-sm">{{ item.text4 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
