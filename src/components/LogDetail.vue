<script setup>
import dayjs from 'dayjs'
import { computed } from 'vue'

import LogDetailMenu from './LogDetailMenu.vue'

import { CATEGORIES } from '../constants/categories.js'

const props = defineProps({
  log: {
    type: Object,
    required: true
  }
})

const category = computed(() => {
  try {
    return CATEGORIES.filter((x) => x.name === props.log.category)[0]
  } catch (err) {
    console.error(`Couldn't find category ${props.log.category} for log ${props.log.id}`)
    return ''
  }
})

const cssClass = `category--${props.log.category}`

const activator = computed(() => {
  return `log-menu-activator-${props.log.id}`
})
</script>

<template>
  <tr v-if="log.isFirstOfDay">
    <td colspan="3"></td>
  </tr>
  <tr v-if="log.isFirstOfDay" class="log__date">
    <td colspan="3">{{ log.formattedDate }}</td>
  </tr>
  <tr>
    <td class="log__timestamp">[{{ dayjs(props.log.timestamp).format('HH:mm:ss') }}]</td>
    <td class="log__text" :class="props.log.active ? undefined : 'log__text--inactive'">
      <span :class="cssClass"
        ><b>{{ category.prefix }}</b></span
      >
      <span>{{ props.log.text }}</span>
      <span>{{ category.suffix }}</span>
    </td>
    <td>
      <v-icon icon="mdi-dots-vertical" :id="activator" />
      <LogDetailMenu
        :log="log"
        :activatorId="activator"
      />
    </td>
  </tr>
</template>

<style scoped>
.log__text--inactive {
  text-decoration: line-through;
}

.log__date {
  background: rgba(41, 41, 41, 0.2);
}
</style>