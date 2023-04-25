<template>
    <v-sheet class="console">
        <slot></slot>
    </v-sheet>
</template>

<style scoped>

.console {
    display: block;
    margin: 0 auto 2rem auto;
    padding: 2rem;
    width: 100vw;
    height: 100%;
    border-radius: 10px;
    overflow-y: scroll;
    background-color: rgb(26, 26, 26);
    -webkit-box-shadow: inset 0 20px 20px -20px rgba(0,0,0,0.8);
    -moz-box-shadow: inset 0 20px 20px -20px rgba(0,0,0,0.8);
    box-shadow: inset 0 20px 20px -20px rgba(0,0,0,0.2);
}
</style>