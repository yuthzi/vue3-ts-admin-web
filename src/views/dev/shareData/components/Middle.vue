<template>
  <div>
    <p>第2层组件: {{ sharedData!.title }}</p>
    <Grandson :sharedData="sharedData" />
  </div>
</template>

<script setup>
import Grandson from './Grandson.vue'
import { defineProps } from 'vue'

defineProps({
  sharedData: Object,
})
</script>
