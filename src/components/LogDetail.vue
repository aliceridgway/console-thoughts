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

const categoryClass = `category--${props.log.category}`
const textClass = `text--${props.log.category}`

const activator = computed(() => {
  return `log-menu-activator-${props.log.id}`
})
</script>

<template>
  <tr v-if="log.isFirstOfDay">
    <td colspan="3"></td>
  </tr>
  <tr v-if="log.isFirstOfDay" class="log__header">
    <td colspan="3"><p class="log__date">
      {{ log.formattedDate }}
    </p></td>
  </tr>
  <tr>
    <td class="log__text" :class="props.log.active ? undefined : 'log__text--inactive'">
      <p class="log__text__content">
        <span :class="categoryClass"
        ><b>{{ category.prefix }}</b></span>
        <span :class="textClass">{{ props.log.text }}</span>
        <span>{{ category.suffix }}</span>
      </p>
    </td>

    <td class="log__timestamp"><v-chip>{{ dayjs(props.log.timestamp).format('HH:mm') }}</v-chip></td>

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

.log__text__content {
  max-width: 550px;
  margin: 1rem 0;
}
.log__text--inactive {
  text-decoration: line-through;
  opacity: 0.5;
}

.log__timestamp {
  font-size: 1rem;
}
.log__header {
  background: rgba(0, 0, 0, 0.2);
  font-weight: bold;
}

.log__date {
  margin: 1rem 0;
}

</style>