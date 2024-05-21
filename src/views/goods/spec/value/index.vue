
<!-- 商品规格值管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :id="`specValId`"
      :columns="columns"
      :requestApi="getGoodsSpecValueList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.GoodsSpecValue.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.GoodsSpecValue.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.GoodsSpecValue.remove']">
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
    <GoodsSpecValueEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getGoodsSpecValueList,
  addGoodsSpecValue,
  updateGoodsSpecValue,
  deleteGoodsSpecValueById,
} from '@/api//goods/spec/value/api'
import type { GoodsSpecValue } from '@/api//goods/spec/value/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import GoodsSpecValueEditDialog from './components/GoodsSpecValueEditDialog.vue'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'specValId', label: 'id' },
  { prop: 'specId', label: '规格ID' },
  { prop: 'specVal', label: '规格值' },
  { prop: 'seq', label: '排序值' },
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
  rowData: Partial<GoodsSpecValue.ResGoodsSpecValueList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addGoodsSpecValue : updateGoodsSpecValue,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: GoodsSpecValue.ResGoodsSpecValueList) => {
  await useHandleData(
    deleteGoodsSpecValueById,
    row.specValId,
    `删除\$\{row.goodsSpecValueName\}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
