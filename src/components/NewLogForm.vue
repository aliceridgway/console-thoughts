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
            bg-color="rgb(26, 26, 26)"
            variant="outlined"
            type="text"
            density="comfortable"
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
    margin: 0 auto 2rem auto;
}

.v-text-field input{
    font-size: 1.2rem;
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