<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="`brandId`"
      :columns="columns"
      :requestApi="getBrandList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.Brand.add']">
          <el-button type="primary" icon="Plus" @click="openDrawer('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.Brand.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDrawer('修改', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.Brand.remove']">
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
    <BrandEditDialog ref="DrawerRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { dataCallback } from '@/utils/pagination'
import { useHandleData } from '@/hooks/useHandleData'
import type { Brand } from '@/api/product/types'
import BrandEditDialog from './components/BrandEditDialog.vue'

import { getBrandList, removeBrand, addBrand, updateBrand } from '@/api'

const columns: ColumnProps[] = [
  { prop: 'brandId', label: 'id' },
  {
    prop: 'brandName',
    label: '品牌名称',
    search: { el: 'input', props: { placeholder: '输入品牌名称' } },
  },
  {
    prop: 'logoUrl',
    label: 'Logo',
    render: ({ row }) => {
      return (
        <>
          <el-image
            src={row.logoUrl}
            style="height: 100px; width: 100px;"
            fit="cover"
          />
        </>
      )
    },
  },
  {
    prop: 'gmtModified',
    label: '更新时间',
    sortable: true,
    search: {
      el: 'date-range-picker',
      isElement: false,
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

const proTable = ref()

// *根据id删除品牌
const handleDelete = async (row: Brand.ResBrandList) => {
  await useHandleData(removeBrand, row.brandId, `删除${row.brandName}品牌`)
  proTable.value.getTableList()
}

// 打开Drawer
const DrawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<Brand.ResBrandList> = {},
) => {
  const params = {
    title,
    rowData: { ...rowData },
    api: title === '新增' ? addBrand : updateBrand,
    getTableList: proTable.value.getTableList,
  }
  DrawerRef.value.acceptParams(params)
}
</script>

<style scoped></style>
