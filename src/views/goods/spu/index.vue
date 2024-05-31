<!-- SPU管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="`spuId`"
      :columns="columns"
      :requestApi="getGoodsSpuList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.GoodsSpu.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.GoodsSpu.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.GoodsSpu.remove']">
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
    <GoodsSpuEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getGoodsSpuList,
  addGoodsSpu,
  updateGoodsSpu,
  deleteGoodsSpuById,
} from '@/api/goods/spu/api'
import type { GoodsSpu } from '@/api/goods/spu/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import GoodsSpuEditDialog from './components/GoodsSpuEditDialog.vue'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'spuId', label: 'id' },
  {
    prop: 'goodsName',
    label: '商品名称',
    search: { el: 'input', key: 'goodsName' },
  },
  {
    prop: 'goodsTitle',
    label: '顾客端的名称',
    search: { el: 'input', key: 'goodsTitle' },
  },
  { prop: 'categoryId', label: '分类ID' },
  { prop: 'brandId', label: '品牌ID' },
  {
    prop: 'brandId',
    label: '品牌',
    search: {
      key: 'brandId',
      el: 'BrandSelectorDialog',
      isElement: false,
      props: { placeholder: '请选择品牌', title: '请选择品牌' },
    },
  },
  { prop: 'mneCode', label: '助记码' },
  { prop: 'artNo', label: '货号' },
  { prop: 'specId', label: '规格ID' },
  { prop: 'unit', label: '计量单位' },
  { prop: 'sellingPrice', label: '商品售价' },
  { prop: 'intro', label: '商品介绍' },
  { prop: 'picUrl', label: '主图路径' },
  { prop: 'isAudited', label: '是否已审核' },
  { prop: 'seq', label: '排序' },
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
  rowData: Partial<GoodsSpu.ResGoodsSpuList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addGoodsSpu : updateGoodsSpu,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: GoodsSpu.ResGoodsSpuList) => {
  await useHandleData(
    deleteGoodsSpuById,
    row.spuId,
    `删除\$\{row.goodsSpuName\}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
