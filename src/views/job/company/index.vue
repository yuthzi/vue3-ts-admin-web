<!-- 招聘公司管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="'companyId'"
      :columns="columns"
      :requestApi="getJobCompanyList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.JobCompany.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.JobCompany.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.JobCompany.remove']">
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
    <JobCompanyEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getJobCompanyList,
  addJobCompany,
  updateJobCompany,
  deleteJobCompanyById,
} from '@/api/job/company/api'
import type { JobCompany } from '@/api/job/company/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { dataCallback } from '@/utils/pagination'
import { jobPlatformEnum } from '@/components/Selector'
import JobCompanyEditDialog from './components/JobCompanyEditDialog.vue'

const onChangeStatus = async (
  val: boolean,
  row: JobCompany.ResJobCompanyList,
) => {
  const params: any = {
    companyId: row.companyId,
    status: val ? 1 : 0,
  }
  await useHandleData(updateJobCompany, params, val ? `启用` : `禁用`)
}

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'platformId',
    label: '平台',
    isShow: false,
    enum: jobPlatformEnum,
    search: {
      key: 'platformId',
      el: 'select',
    },
  },
  {
    prop: 'companyName',
    label: '公司名',
    search: { el: 'input', key: 'companyName' },
  },
  { prop: 'companyTag', label: '公司标签' },
  { prop: 'location', label: '地点' },
  { prop: 'scale', label: '公司规模' },
  { prop: 'business', label: '行业' },
  { prop: 'stage', label: '融资阶段' },
  {
    prop: 'sourceUrl',
    label: '原网址',
    render: ({ row }) => {
      return (
        <>
          <el-link href={row.sourceUrl} target="_blank" type="primary">
            原网址
          </el-link>
        </>
      )
    },
  },
  {
    type: 'switch',
    prop: 'status',
    label: '状态',
    isShow: false,
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
  rowData: Partial<JobCompany.ResJobCompanyList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addJobCompany : updateJobCompany,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: JobCompany.ResJobCompanyList) => {
  await useHandleData(
    deleteJobCompanyById,
    row.companyId,
    `删除${row.companyName}`,
  )
  proTable.value.getTableList()
}
</script>

<style lang="scss" scoped></style>
