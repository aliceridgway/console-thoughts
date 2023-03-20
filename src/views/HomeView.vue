<script setup>
import LogList from '../components/LogList.vue'
import NewLogForm from '../components/NewLogForm.vue'
import ConsoleWindow from '../components/ConsoleWindow.vue';

</script>

<template>
  <NewLogForm />

  <ConsoleWindow>
    <LogList />
  </ConsoleWindow>
    

</template>
