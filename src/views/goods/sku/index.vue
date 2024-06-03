<!-- SKU管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="'skuId'"
      :columns="columns"
      :requestApi="getGoodsSkuList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.GoodsSku.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.GoodsSku.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.GoodsSku.remove']">
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
    <GoodsSkuEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getGoodsSkuList,
  addGoodsSku,
  updateGoodsSku,
  deleteGoodsSkuById,
} from '@/api/goods/sku/api'
import type { GoodsSku } from '@/api/goods/sku/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { dataCallback } from '@/utils/pagination'
import GoodsSkuEditDialog from './components/GoodsSkuEditDialog.vue'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'skuId', label: 'id' },
  { prop: 'spuId', label: 'SPU ID' },
  { prop: 'spec', label: '规格' },
  { prop: 'unit', label: '计量单位' },
  { prop: 'sellingPrice', label: '销售价' },
  { prop: 'quantity', label: '数量' },
  { prop: 'lockQuantity', label: '下单锁定数量' },
  { prop: 'version', label: '版本号（用于乐观锁）' },
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
  rowData: Partial<GoodsSku.ResGoodsSkuList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addGoodsSku : updateGoodsSku,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: GoodsSku.ResGoodsSkuList) => {
  await useHandleData(deleteGoodsSkuById, row.skuId, `删除`)
  proTable.value.getTableList()
}
</script>

<style scoped></style>
