<!-- 客户等级管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="`levelId`"
      :columns="columns"
      :requestApi="getCustomerLevelList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.CustomerLevel.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.CustomerLevel.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.CustomerLevel.remove']">
          <el-button
            type="primary"
            link
            icon="Delete"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </Auth>
      </template>
    </ProTable>
    <CustomerLevelEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getCustomerLevelList,
  addCustomerLevel,
  updateCustomerLevel,
  deleteCustomerLevelById,
} from '@/api/customer/level/api'
import type { CustomerLevel } from '@/api/customer/level/type'
import { dataCallback } from '@/utils/pagination'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import CustomerLevelEditDialog from './components/CustomerLevelEditDialog.vue'

const onChangeStatus = async (
  val: boolean,
  row: CustomerLevel.ResCustomerLevelList,
) => {
  const params: any = {
    levelId: row.levelId,
    status: val ? 1 : 0,
  }
  await useHandleData(updateCustomerLevel, params, val ? `启用` : `禁用`)
}

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'levelId', label: 'id' },
  {
    prop: 'levelName',
    label: '等级名称',
    search: { el: 'input', key: 'levelName' },
  },
  { prop: 'levelDesc', label: '等级描述' },
  { prop: 'minScore', label: '所需最小积分' },
  {
    type: 'switch',
    prop: 'status',
    label: '状态',
    onChange: onChangeStatus,
    activeValue: 1,
    inactiveValue: 0,
  },
  { prop: 'gmtCreate', label: '创建时间', sortable: true },
  { prop: 'gmtModified', label: '更新时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 },
]

// 打开Dialog
const DialogRef = ref()
const openDialog = (
  title: string,
  rowData: Partial<CustomerLevel.ResCustomerLevelList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addCustomerLevel : updateCustomerLevel,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: CustomerLevel.ResCustomerLevelList) => {
  await useHandleData(
    deleteCustomerLevelById,
    row.levelId,
    `删除\$\{row.customerLevelName\}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
