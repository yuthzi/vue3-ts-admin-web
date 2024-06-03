<!-- 品牌管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="'brandId'"
      :columns="columns"
      :requestApi="getBrandList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.Brand.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
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
            @click="openDialog('编辑', scope.row)"
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
    <BrandEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getBrandList,
  addBrand,
  updateBrand,
  deleteBrandById,
} from '@/api/goods/brand/api'
import type { Brand } from '@/api/goods/brand/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { dataCallback } from '@/utils/pagination'
import BrandEditDialog from './components/BrandEditDialog.vue'

const onChangeStatus = async (val: boolean, row: Brand.ResBrandList) => {
  const params: any = {
    brandId: row.brandId,
    status: val ? 1 : 0,
  }
  await useHandleData(updateBrand, params, val ? `启用` : `禁用`)
}

// *表格配置项
const columns: ColumnProps[] = [
  { prop: 'brandId', label: 'id' },
  {
    prop: 'brandName',
    label: '品牌名称',
    search: { el: 'input', key: 'brandName' },
  },
  {
    prop: 'initial',
    label: '品牌名首字母',
    search: { el: 'input', key: 'initial' },
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
  { prop: 'seq', label: '排序值' },
  {
    type: 'switch',
    prop: 'status',
    label: '状态',
    onChange: onChangeStatus,
    activeValue: 1,
    inactiveValue: 0,
    enum: [
      {
        value: 0,
        label: '禁用',
      },
      {
        value: 1,
        label: '启用',
      },
    ],
    search: { el: 'select', key: 'status' },
  },
  {
    prop: 'gmtCreate',
    label: '创建时间',
    search: { el: 'date-range-picker', isElement: false, key: 'gmtCreate' },
  },
  {
    prop: 'gmtModified',
    label: '更新时间',
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 },
]

// 打开Dialog
const DialogRef = ref()
const openDialog = (
  title: string,
  rowData: Partial<Brand.ResBrandList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addBrand : updateBrand,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: Brand.ResBrandList) => {
  await useHandleData(deleteBrandById, row.brandId, `删除${row.brandName}`)
  proTable.value.getTableList()
}
</script>

<style scoped></style>
