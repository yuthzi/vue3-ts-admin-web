<template>
  <div>
    <ProTable
      ref="proTable"
      :id="`levelId`"
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
    <LevelDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getCustomerLevelList,
  addCustomerLevel,
  updateCustomerLevel,
  deleteCustomerLevelById,
} from '@/api'
import type { ClientUser } from '@/api/client-user/types'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import LevelDialog from './components/LevelDialog.vue'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'levelName',
    label: '等级名称',
    search: { el: 'input', key: 'levelName' },
  },
  { prop: 'levelDesc', label: '描述', isShow: false },
  { prop: 'minScore', label: '所需积分', sortable: true },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }) => {
      return (
        <el-switch
          v-model={row.status}
          onChange={(e: boolean) => {
            onChangeEnable(e, row)
          }}
          style="--el-switch-on-color: #13ce66;"
        ></el-switch>
      )
    },
  },
  { prop: 'gmtCreate', label: '创建时间', sortable: true, width: 210 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 },
]

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

// 打开Dialog
const DialogRef = ref()
const openDialog = (
  title: string,
  rowData: Partial<ClientUser.ResLevelList> = {},
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

const onChangeEnable = async (val: boolean, row: any) => {
  const params: any = {
    levelId: row.levelId,
    status: val ? 1 : 0,
  }
  await useHandleData(
    updateCustomerLevel,
    params,
    val ? `启用${row.levelName}` : `禁用${row.levelName}`,
  )
}

// *根据id删除
const handleDelete = async (row: ClientUser.ResLevelList) => {
  await useHandleData(
    deleteCustomerLevelById,
    row.levelId,
    `删除${row.levelName}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
