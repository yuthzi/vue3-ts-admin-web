<template>
  <div>
    <p>
      使用reactive实现父子组件双向数据绑定。该例子有3层组件，最底层的组件输入值，显示在每一层组件
    </p>
    <p>第1层组件: {{ sharedData.title }}</p>
    <Middle :sharedData="sharedData" />
  </div>
</template>

<script setup>
/**
 * 使用reactive实现父子组件双向数据绑定。该例子
 */
import { reactive } from 'vue'
import Middle from './components/Middle.vue'

const sharedData = reactive({
  title: 'a',
})
</script>
