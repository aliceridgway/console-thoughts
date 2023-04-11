<script setup>
import { ref, onMounted, Suspense } from 'vue'
import LogDetail from './LogDetail.vue'
import { useLogStore } from '../stores/logStore'

const store = useLogStore()

const bottom = ref(null)

function scrollToBottom(behaviour = 'auto') {
  bottom.value.scrollIntoView({ behavior: behaviour })
}

// scroll to the bottom when the component is mounted
onMounted(async () => {
  console.log("I've been mounted!")
  await store.fetchLogs()

  store.$subscribe((mutation) => {
    console.log(mutation.events.type)
    if (mutation.events.type === 'add') {
      console.log('scrolling to bottom')
      scrollToBottom('smooth')
    }
  })

  scrollToBottom()
})
</script>

<template>
  <v-table class="log-list" density="comfortable">
    <tbody>
      <LogDetail v-for="log in store.getAllLogs" :key="log.id" :log="log" />
      <tr></tr>
      <tr ref="bottom"></tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.log-list {
  list-style: none;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  background: none;
}

.log-list tr {
  padding: 0.25rem 0;
}
</style>