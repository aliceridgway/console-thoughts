<script setup>

import {computed} from 'vue';

import { useLogStore } from '../stores/logStore';

const store = useLogStore();

const props = defineProps({
    activatorId: {
        type: String,
        required: true
    },
    log: {
        type: Object,
        required: true
    }
});

const activator = computed(() => {
    return `#${props.activatorId}`
})

const activeLabel = computed(() => {
    return props.log.active ? "Strike" : "Unstrike"
})

</script>
<template>
    <v-menu :activator=activator open-on-hover>
      <v-list>
        <v-list-item @click="store.toggleLogActivity(log)">
          <v-list-item-title>{{ activeLabel }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="store.deleteLog(log)">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>