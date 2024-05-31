<!-- 客户管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="`customerId`"
      :columns="columns"
      :requestApi="getCustomerList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.CustomerList.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.CustomerList.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.CustomerList.remove']">
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
    <CustomerEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getCustomerList,
  addCustomer,
  updateCustomer,
  deleteCustomerById,
} from '@/api/customer/api'
import type { Customer } from '@/api/customer/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { dataCallback } from '@/utils/pagination'
import { useHandleData } from '@/hooks/useHandleData'
import CustomerEditDialog from './components/CustomerEditDialog.vue'

const onChangeStatus = async (val: boolean, row: Customer.ResCustomerList) => {
  const params: any = {
    customerId: row.customerId,
    status: val ? 1 : 0,
  }
  await useHandleData(updateCustomer, params, val ? `启用` : `禁用`)
}

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'customerId', label: 'id' },
  {
    prop: 'username',
    label: '用户名',
    search: { el: 'input', key: 'username' },
  },
  {
    prop: 'nickname',
    label: '姓名',
    search: { el: 'input', key: 'nickname' },
  },
  {
    prop: 'gender',
    label: '性别',
    enum: [
      {
        value: 0,
        label: '保密',
      },
      {
        value: 1,
        label: '男',
      },
      {
        value: 2,
        label: '女',
      },
    ],
    search: { el: 'select', key: 'gender' },
  },
  { prop: 'levelScore', label: '等级积分' },
  {
    prop: 'levelName',
    label: '等级名称',
    search: { el: 'input', key: 'levelName' },
  },
  {
    prop: 'phone',
    label: '联系电话',
    search: { el: 'input', key: 'phone' },
  },
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
  rowData: Partial<Customer.ResCustomerList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addCustomer : updateCustomer,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: Customer.ResCustomerList) => {
  await useHandleData(
    deleteCustomerById,
    row.customerId,
    `删除\$\{row.customerName\}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
