<template>
    <div>
      <p>Redirecting...</p>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue'
  import { useAuthStore } from '../stores/authStore.js'
  import router from '../router'

  export default defineComponent({
    name: 'Callback',
    setup() {
      const authStore = useAuthStore()
  
      onMounted(() => {
        const params = new URLSearchParams(window.location.search)
        const authorizationCode = params.get('code')

        authStore.fetchToken(authorizationCode).then((data) => {
            console.log(data)
            if (data.access_token) {
                router.push({ name: 'home' })
            } else {
                router.push({ name: 'error' })
            }
            
        })


      })
  
      return {}
    }
  })
  </script>
  