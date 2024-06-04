<template>
  <codemirror
    v-model="inputRef"
    placeholder="Code gose here..."
    :style="{ height: 'height' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
    @ready="log('ready', $event)"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

/**
 * props类型定义
 */
export interface Props {
  value: string // 数据
  height?: string // style高度
}

// 组件props
const props = withDefaults(defineProps<Props>(), {
  value: "console.log('Hello world!')",
  height: '70vh',
})

const inputRef = ref(props.value)

const extensions = [javascript(), oneDark]
const log = console.log

defineExpose({
  code: inputRef.value,
})
</script>
