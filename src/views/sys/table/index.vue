<!-- 表信息管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="'tableId'"
      :columns="columns"
      :requestApi="getSysTableList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.SysTable.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
        <el-button
          type="primary"
          icon="Refresh"
          @click="sync"
          :loading="loading"
        >
          同步
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.SysTable.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.SysTable.remove']">
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
    <SysTableEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getSysTableList,
  addSysTable,
  updateSysTable,
  deleteSysTableById,
  syncTable,
} from '@/api/sys/table/api'
import type { SysTable } from '@/api/sys/table/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { dataCallback } from '@/utils/pagination'
import SysTableEditDialog from './components/SysTableEditDialog.vue'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'tableId', label: 'id' },
  {
    prop: 'tableName',
    label: '表名',
    search: { el: 'input', key: 'tableName' },
  },
  {
    prop: 'entityName',
    label: '实体名',
    search: { el: 'input', key: 'entityName' },
  },
  { prop: 'memo', label: '表注释' },
  {
    prop: 'gmtCreate',
    label: '创建时间',
    sortable: true,
    search: { el: 'date-range-picker', isElement: false, key: 'gmtCreate' },
  },
  {
    prop: 'gmtModified',
    label: '更新时间',
    sortable: true,
    search: { el: 'date-range-picker', isElement: false, key: 'gmtModified' },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 },
]

// 打开Dialog
const DialogRef = ref()
const openDialog = (
  title: string,
  rowData: Partial<SysTable.ResSysTableList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addSysTable : updateSysTable,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// 获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()
const loading = ref<boolean>(false)

// 根据id删除
const handleDelete = async (row: SysTable.ResSysTableList) => {
  await useHandleData(deleteSysTableById, row.tableId, `删除${row.tableName}`)
  proTable.value.getTableList()
}

const sync = async () => {
  loading.value = true
  await syncTable()
  ElMessage.success({ message: `同步成功！` })
  loading.value = false
  proTable.value.getTableList()
}
</script>

<style lang="scss" scoped></style>
