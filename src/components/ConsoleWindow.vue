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
    width: 80vw;
    height: 100%;
    max-width: 1000px;
    border-radius: 10px;
    overflow-y: scroll;
    background-color: rgba(0,0,0,0.9);
    box-shadow: 10px 10px 20px rgba(17,28,48, 0.5);
}
</style>