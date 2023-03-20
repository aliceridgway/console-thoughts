<script setup>

import background from "../assets/background.jpg"

</script>

<template>
  <v-app class="app">
    <v-img
      class="app__background"
      :src="background"
    />
    <slot></slot> 
  </v-app>
</template>

<style scoped>
.app {
  position: relative;
  max-height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}

.app__background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

</style>