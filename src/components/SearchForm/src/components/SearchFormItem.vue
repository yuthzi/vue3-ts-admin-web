<template>
  <div class="form-item-wrap">
    <!-- element plus的组件 -->
    <component
      v-if="column.search?.el && isElementPlus"
      :is="`el-${column.search.el}`"
      v-bind="handleSearchProps"
      v-model="searchParam[column.search.key ?? handleProp(column.prop!)]"
      :data="column.search?.el === 'tree-select' ? columnEnum : []"
      :options="
        ['cascader', 'select-v2'].includes(column.search?.el) ? columnEnum : []
      "
      :placeholder="placeholder"
      :clearable="clearable"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    >
      <template #default="{ data }" v-if="column.search.el === 'cascader'">
        <span>{{ data[fieldNames.label] }}</span>
      </template>
      <template v-if="column.search.el === 'select'">
        <component
          :is="`el-option`"
          v-for="(col, index) in columnEnum"
          :key="index"
          :label="col[fieldNames.label]"
          :value="col[fieldNames.value]"
        ></component>
      </template>
      <slot v-else></slot>
    </component>
    <!-- 自定义组件 -->
    <component
      v-if="column.search?.el && !isElementPlus"
      :is="`${column.search.el}`"
      v-bind="handleSearchProps"
      v-model="searchParam[column.search.key ?? handleProp(column.prop!)]"
      :placeholder="placeholder"
      :clearable="clearable"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script setup lang="ts" name="SearchFormItem">
import { computed, inject, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'

interface SearchFormItem {
  column: ColumnProps
  searchParam: { [key: string]: any }
}
const props = defineProps<SearchFormItem>()

// 判断 fieldNames 设置 label && value 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? 'label',
    value: props.column.fieldNames?.value ?? 'value',
  }
})

// 接收 enumMap
const enumMap = inject('enumMap', ref(new Map()))
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop)
  if (!enumData) return []
  if (props.column.search?.el === 'select-v2' && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return {
        ...item,
        label: item[fieldNames.value.label],
        value: item[fieldNames.value.value],
      }
    })
  }
  return enumData
})

// 处理透传的 searchProps(el 为 tree-select、cascader 的时候需要给下默认 label 和 value)
const handleSearchProps = computed(() => {
  const label = fieldNames.value.label
  const value = fieldNames.value.value
  const searchEl = props.column.search?.el
  const searchProps = props.column.search?.props ?? {}
  let handleProps = searchProps
  if (searchEl === 'tree-select')
    handleProps = {
      ...searchProps,
      props: { label, ...searchProps.props },
      nodeKey: value,
    }
  if (searchEl === 'cascader')
    handleProps = {
      ...searchProps,
      props: { label, value, ...searchProps.props },
    }
  return handleProps
})

// 判断 placeholder
const placeholder = computed(() => {
  const search = props.column.search
  return (
    search?.props?.placeholder ?? (search?.el === 'input' ? '请输入' : '请选择')
  )
})

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column.search
  return (
    search?.props?.clearable ??
    (search?.defaultValue == null || search?.defaultValue == undefined)
  )
})

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
const handleProp = (prop: string) => {
  const propArr = prop.split('.')
  if (propArr.length == 1) return prop
  return propArr[propArr.length - 1]
}

// 判断是否是element-plus的组件。默认是true
const isElementPlus = computed(() => {
  // console.log('searchParam=' + JSON.stringify(props.searchParam))
  const v = props.column.search?.isElement
  return v === undefined ? true : v
})
</script>
