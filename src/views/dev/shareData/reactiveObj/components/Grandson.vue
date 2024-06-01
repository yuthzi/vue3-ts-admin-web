<template>
  <div>
    <p>第3层组件: {{ sharedData.title }}</p>
    <el-input ref="inputRef" v-model="sharedData.title" :width="100"></el-input>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  sharedData: Object,
})

const inputRef = ref()
</script>
