<template>
  <v-app class="app">
    <slot></slot> 
  </v-app>
</template>

<style scoped>
.app {
  position: relative;
  max-height: 100vh;
  background-color: rgb(20, 20, 20);
  font-family: "Cousine For Powerline";
  width: 100vw;
  padding: 0;
  margin: 0;
}


</style>