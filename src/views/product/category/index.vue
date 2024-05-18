<!-- 分类管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :id="`categoryId`"
      :columns="columns"
      :requestApi="getCategoryList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.Category.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.Category.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.Category.remove']">
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
    <CategoryDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategoryById,
} from '@/api/product/category'
import type { Category } from '@/api/product/types'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import CategoryDialog from './components/CategoryDialog.vue'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'categoryId', label: 'id' },
  {
    prop: 'pid',
    label: '父级分类ID',
  },
  {
    prop: 'categoryName',
    label: '分类名称',
    search: { el: 'input', key: 'categoryName' },
  },
  {
    prop: 'seq',
    label: '排序值',
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'gmtCreate',
    label: '创建时间',
    sortable: true,
  },
  {
    prop: 'gmtModified',
    label: '更新时间',
    sortable: true,
  },
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
  rowData: Partial<Category.ResCategoryList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addCategory : updateCategory,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: Category.ResCategoryList) => {
  await useHandleData(
    deleteCategoryById,
    row.categoryId,
    `删除${row.categoryName}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
