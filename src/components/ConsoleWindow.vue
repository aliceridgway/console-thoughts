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
    overflow-y: scroll;
}
</style>