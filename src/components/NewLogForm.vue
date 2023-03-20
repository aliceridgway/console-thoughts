<script setup>

import { ref, computed } from 'vue'
import { useLogStore } from '../stores/logStore';
import { getLogCategory, getLogText, isCategorized } from "../helpers/logHelper.js"

const store = useLogStore();

const log = ref("")

const category = computed(() => {
    return getLogCategory(log.value)
})

const text = computed(() => {
    return getLogText(log.value)

})

function submitForm(event) {
    event.preventDefault()
    store.addLog(
        {
            text: text.value,
            category: category.value,
        }
    )
    log.value = ""
}

</script>

<template>

    <v-form class="new-log" @submit="submitForm">

        <v-text-field
            class="new-log__text"
            v-model="log"
            bg-color="rgba(0,0,0,0.5)"
            variant="solo"
            type="text"
        >
            <template v-slot:append-inner>
                <v-chip variant="elevated" :color="isCategorized(category) ? 'pink' : 'grey-darken-4'" class="new-log__category">{{ category }}</v-chip>
                <v-icon @click="submitForm" icon="mdi-send" />
            </template>
        
        </v-text-field>


    </v-form>

</template>

<style scoped>

.new-log{
    display: flex;
    width: 500px;
    margin: 2rem auto;
}

.new-log__category {
    margin-right: 1rem;
}

.v-field__append-inner {
    padding: 0;
}

.v-field__field {
    width: 600px;
}
</style>