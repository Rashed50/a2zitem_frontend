import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/pages/CartPage.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/pages/AboutUsPage.vue'),
        },
        {
          path: 'privacy-policy',
          name: 'privacy-policy',
          component: () => import('@/pages/PrivacyPolicyPage.vue'),
        },
        {
          path: 'terms-and-conditions',
          name: 'terms-and-conditions',
          component: () => import('@/pages/TermsAndConditionsPage.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/pages/ContactUsPage.vue'),
        },
      ],
    },
  ],
})

export default router
