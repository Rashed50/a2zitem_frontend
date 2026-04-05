<script setup>
import { RouterLink } from 'vue-router'

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/a2zitembd/', color: 'bg-[#1877f2]', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'Twitter', href: '#', color: 'bg-[#1da1f2]', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { name: 'Instagram', href: '#', color: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]', icon: '' },
  { name: 'WhatsApp', href: 'https://wa.me/8801703429479', color: 'bg-[#25d366]', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.664.868 5.136 2.339 7.082L.717 23.283l4.2-1.102A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCPepgmX-AVXc1pQY5YuvapA', color: 'bg-[#ff0000]', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
]

const aboutLinks = [
  { to: '/privacy-policy', label: 'EMI Terms' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '#', label: 'Warranty Policy' },
  { to: '#', label: 'Blog' },
]

const policyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/terms-and-conditions', label: 'Terms and Conditions' },
  { to: '#', label: 'Sitemap' },
  { to: '/contact', label: 'Contact Us' },
  { to: '#', label: 'Online Delivery' },
  { to: '#', label: 'Refund and Return Policy' },
  { to: '#', label: 'Brands' },
  { to: '#', label: 'ডিজিটাল কমার্স নির্দেশিকা ২০২১' },
]

const distributors = ['IMICE', 'Rapoo', 'HavitPro', 'E-Taxel']
const memberships = ['Green', 'ECS', 'e-Cas']
</script>

<template>
  <div class="container mx-auto px-4 py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
      <!-- Column 1: Logo, contact, subscribe -->
      <div>
        <router-link to="/" class="inline-block flex items-center gap-2">
          <img src="/app-logo.jpeg" alt="A2Z Items" class="h-8 w-auto object-contain" />
          <span class="text-xl font-bold text-white">A2Z Items</span>
        </router-link>
        <p class="text-gray-400 text-sm mt-1">ELECTRONICS ITEMS • A TO Z</p>
        <a href="https://a2zitem.com" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline text-sm font-medium mt-1 inline-block">a2zitem.com</a>
        <div class="mt-4 text-gray-400 text-sm space-y-2">
          <p>a2zitem24@gmail.com</p>
          <p>-81 Laboratory Road, (New Elephant Road) Masuma Plaza, (1st Floor) Dhaka, Bangladesh.</p>
          <p>Tel: 9614502038</p>
          <p class="text-red-500">Friday Open.</p>
        </div>
        <div class="mt-6">
          <p class="font-semibold text-white text-sm mb-3">Subscribe Us</p>
          <div class="flex gap-2">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.href"
              :aria-label="s.name"
              class="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
              :class="s.color"
            >
              <svg v-if="s.name === 'Facebook'" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <svg v-else-if="s.name === 'WhatsApp'" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              <svg v-else-if="s.name === 'YouTube'" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span v-else class="text-xs font-bold">{{ s.name.charAt(0) }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Column 2: About Us -->
      <div>
        <h3 class="font-bold text-white text-sm uppercase mb-4">About Us</h3>
        <ul class="space-y-2">
          <li v-for="link in aboutLinks" :key="link.label">
            <RouterLink :to="link.to" class="text-gray-400 text-sm hover:text-white flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Column 3: Policies -->
      <div>
        <h3 class="font-bold text-white text-sm uppercase mb-4">Policies &amp; More</h3>
        <ul class="space-y-2">
          <li v-for="link in policyLinks" :key="link.label">
            <RouterLink :to="link.to" class="text-gray-400 text-sm hover:text-white flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Column 4: Distributorship & Membership -->
      <div>
        <h3 class="font-bold text-white text-sm uppercase mb-4">Distributorship</h3>
        <div class="flex flex-wrap gap-2 mb-6">
          <div
            v-for="d in distributors"
            :key="d"
            class="px-3 py-2 rounded bg-white/10 text-gray-300 text-xs font-medium"
          >
            {{ d }}
          </div>
        </div>
        <h3 class="font-bold text-white text-sm uppercase mb-4">Membership</h3>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="m in memberships"
            :key="m"
            class="px-3 py-2 rounded bg-white/10 text-gray-300 text-xs font-medium"
          >
            {{ m }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
