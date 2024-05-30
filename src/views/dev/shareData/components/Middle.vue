<template>
  <div>
    <p>第2层组件: {{ searchParam[key] }}</p>
    <Grandson v-model="searchParam[key]" />
  </div>
</template>

<script setup lang="ts">
import Grandson from './Grandson.vue'
import { defineProps } from 'vue'

const key = 'title'

interface SearchFormItem {
  searchParam: { [key: string]: any }
}

const props = defineProps<SearchFormItem>()

// defineProps({
//   sharedData: Object,
// })
</script>
