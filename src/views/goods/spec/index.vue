<!-- 商品规格管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :id="`specId`"
      :columns="columns"
      :requestApi="getGoodsSpecList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.GoodsSpec.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.GoodsSpec.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.GoodsSpec.remove']">
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
    <GoodsSpecEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getGoodsSpecList,
  addGoodsSpec,
  updateGoodsSpec,
  deleteGoodsSpecById,
} from '@/api/goods/spec/api'
import type { GoodsSpec, GoodsSpecValue } from '@/api/goods/spec/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import GoodsSpecEditDialog from './components/GoodsSpecEditDialog.vue'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'specId', label: 'id' },
  {
    prop: 'specName',
    label: '规格名',
    search: { el: 'input', key: 'specName' },
  },
  { prop: 'categoryId', label: '分类ID' },
  { prop: 'seq', label: '排序值' },
  {
    prop: 'values',
    label: '属性值',
    render: ({ row }) => {
      if (row.values) {
        const v = row.values.map(
          (e: GoodsSpecValue.ResGoodsSpecValueList) => e.specVal,
        )
        return v.join(', ')
      } else {
        return ''
      }
    },
  },
  { prop: 'gmtCreate', label: '创建时间', sortable: true },
  { prop: 'gmtModified', label: '更新时间', sortable: true },
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
  rowData: Partial<GoodsSpec.ResGoodsSpecList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addGoodsSpec : updateGoodsSpec,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: GoodsSpec.ResGoodsSpecList) => {
  await useHandleData(deleteGoodsSpecById, row.specId, `删除${row.specName}`)
  proTable.value.getTableList()
}
</script>

<style scoped></style>
