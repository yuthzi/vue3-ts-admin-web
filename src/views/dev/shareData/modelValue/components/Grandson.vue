<template>
  <div>
    <p>第3层组件: {{ modelValue }}</p>
    <el-input
      v-model="inputModel"
      style="width: 200px"
      @input="handleInput"
    ></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, watch, defineProps } from 'vue'

const UPDATE_MODEL_EVENT = 'update:modelValue'
const emit = defineEmits(['update:modelValue', 'input'])

interface DialogProps {
  modelValue?: any
}

// props定义
const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: '',
})

const inputModel = ref(!props.modelValue ? '' : String(props.modelValue))
// 响应父组件重置的关键点: modelValue(名称固定), computed(ref不行), watch
const nativeInputValue = computed(() =>
  !props.modelValue ? '' : String(props.modelValue),
)

watch(nativeInputValue, (val, oldVal) => {
  console.log('watch input value', val, oldVal)
  // 只有父组件重置清除数据时才需要更新inputModel。即数据变化是自父组件到子组件。输入时是：子组件到父组件
  if (val.length == 0) {
    inputModel.value = ''
  }
})

const handleInput = async (val: any) => {
  // 往父组件传值的关键点：UPDATE_MODEL_EVENT
  emit(UPDATE_MODEL_EVENT, val)
  emit('input', val)
}
</script>
