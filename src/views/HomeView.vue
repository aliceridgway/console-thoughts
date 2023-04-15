<script setup>
import LogList from '../components/LogList.vue'
import NewLogForm from '../components/NewLogForm.vue'
import ConsoleWindow from '../components/ConsoleWindow.vue'
import AuthenticatedOnly from '../components/AuthenticatedOnly.vue';

</script>

<template>
  <AuthenticatedOnly>
    <NewLogForm />
    <ConsoleWindow>
      <Suspense>
        <template #default>
          <LogList />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </ConsoleWindow>
  </AuthenticatedOnly>
</template>
