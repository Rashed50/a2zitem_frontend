<script setup>
import FooterStrip from './FooterStrip.vue'
import FooterColumns from './FooterColumns.vue'
import FooterPayment from './FooterPayment.vue'
import FooterCopyright from './FooterCopyright.vue'
import FloatingActions from './FloatingActions.vue'
</script>

<template>
  <footer class="bg-gray-900 text-gray-400 mt-auto">
    <FooterStrip />
    <FooterColumns />
    <!-- <FooterPayment /> -->
    <FooterCopyright />
    <FloatingActions />
  </footer>
</template>
