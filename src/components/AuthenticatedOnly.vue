<script setup>
import { useAuthStore } from '../stores/authStore.js'
import RedirectToLogin from './RedirectToLogin.vue';

const authStore = useAuthStore()
</script>

<template>
  <slot v-if="authStore.isAuthenticated"></slot>
  <RedirectToLogin v-else />
</template>