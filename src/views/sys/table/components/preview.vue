<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane
      v-for="item in codes"
      :lazy="true"
      :key="item!.name"
      :label="item!.name"
      :name="item!.name"
    >
      <IDEjava :value="item!.code" :height="height"></IDEjava>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import router from '@/router'
import { previewTable } from '@/api/sys/table/api'
import { SysTable } from '@/api/sys/table/type'

/**
 * props类型定义
 */
export interface Props {
  height?: string // style高度
}

// 组件props
withDefaults(defineProps<Props>(), {
  height: '70vh',
})

const codes = ref<SysTable.ResCodeGen>()
const activeName = ref('ApiModel')

const tableId = router.currentRoute.value.query.tableId
console.log('tableId=' + tableId)
previewTable(tableId)
  .then((resp) => {
    let { data } = resp
    codes.value = data
  })
  .catch(() => {
    router.go(-1)
  })
</script>

<style lang="scss" scoped></style>
