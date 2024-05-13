<template>
  <div>
    <ProTable ref="proTable" :selectId="`logId`" :columns="columns" :requestApi="getLoginLogList"
      :dataCallback="dataCallback">
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { getLoginLogList } from '@/api'

const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'username',
    label: 'username',
    search: { el: 'input', props: { placeholder: '输入username' } },
  },
  { prop: 'ip', label: 'ip' },
  { prop: 'location', label: '城市' },
  { prop: 'browser', label: '浏览器' },
  { prop: 'os', label: '操作系统' },
  {
    prop: 'status',
    label: '状态',
    enum: [
      {
        label: '登录失败',
        value: 0,
      },
      {
        label: '登录成功',
        value: 1,
      },
    ],
  },
  { prop: 'msg', label: '消息' },
  { prop: 'gmtCreate', label: '创建时间', sortable: true },
  { prop: 'gmtModified', label: '更新时间', sortable: true },
  // { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

</script>
