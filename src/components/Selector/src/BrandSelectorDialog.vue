<template>
  <div>
    <SelectorDialog
      :selectId="`brandId`"
      :dataCallback="dataCallback"
      :columns="columns"
      :isShowSearch="true"
      :requestApi="getBrandList"
      :pageSize="10"
      :label="'brandName'"
      :value="'brandId'"
      @updateInput="handleUpdateInput"
    ></SelectorDialog>
  </div>
</template>

<script name="BrandSelectorDialog" lang="ts" setup>
import { getBrandList } from '@/api'
import { ColumnProps } from '@/components/ProTable/src/types'
import { defineEmits } from 'vue'

const emit = defineEmits(['updateInput'])

interface DialogProps {
  title?: string
  placeholder?: string // 输入框的占位符
  label?: string
  value?: string
}

// props定义
const props = withDefaults(defineProps<DialogProps>(), {
  isShowSearch: true,
  title: '请选择',
  placeholder: '请输入',
  highlightCurrentRow: true,
  label: 'brandName',
  value: 'brandId',
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

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

function handleUpdateInput(val: any) {
  emit('updateInput', val)
}
</script>

<style lang="scss" scoped></style>
