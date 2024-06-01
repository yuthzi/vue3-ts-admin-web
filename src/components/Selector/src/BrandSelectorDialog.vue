<template>
  <SelectorDialog
    v-model="inputModel"
    :selectId="`brandId`"
    :dataCallback="dataCallback"
    :columns="columns"
    :isShowSearch="true"
    :requestApi="getBrandList"
    :pageSize="10"
    :labelKey="'brandName'"
    :valueKey="'brandId'"
  >
    >
  </SelectorDialog>
</template>

<script name="BrandSelectorDialog" lang="ts" setup>
import { getBrandList } from '@/api'
import { ColumnProps } from '@/components/ProTable/src/types'
import { computed, defineEmits, ref, watch } from 'vue'
import { dataCallback } from '@/utils/pagination'

const UPDATE_MODEL_EVENT = 'update:modelValue'
const emit = defineEmits(['update:modelValue', 'input'])

interface DialogProps {
  title?: string
  placeholder?: string // 输入框的占位符
  modelValue?: any
}

// props定义
const props = withDefaults(defineProps<DialogProps>(), {
  isShowSearch: true,
  title: '请选择',
  placeholder: '请输入',
  highlightCurrentRow: true,
  modelValue: '',
})

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', label: '#' },
  { prop: 'brandId', label: 'id' },
  {
    prop: 'brandName',
    label: '品牌名称',
    search: { el: 'input', props: { placeholder: '输入品牌名称' } },
  },
]

const inputModel = ref(!props.modelValue ? '' : String(props.modelValue))
// 响应父组件重置的关键点: modelValue(名称固定), computed(ref不行), watch
const nativeInputValue = computed(() =>
  !props.modelValue ? '' : String(props.modelValue),
)

// 监听子组件的修改
watch(inputModel, (val, oldVal) => {
  console.log('brand watch inputModel', val, oldVal)
  emit(UPDATE_MODEL_EVENT, val)
})

//TODO 试试这样子：
// const value = computed({
//     get(){
//         return props.modelValue
//     },
//     set(val){
//         emits('update:modelValue', val)
//     }
// })

// 监听父组件的修改
watch(nativeInputValue, (val, oldVal) => {
  console.log('brand watch nativeInputValue', val, oldVal)
  // 只有父组件重置清除数据时才需要更新inputModel。即数据变化是自父组件到子组件。输入时是：子组件到父组件
  if (val.length == 0) {
    inputModel.value = ''
  }
})
</script>

<style lang="scss" scoped></style>
