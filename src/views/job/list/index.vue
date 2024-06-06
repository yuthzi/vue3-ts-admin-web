<!-- 招聘管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="'jobId'"
      :columns="columns"
      :requestApi="getJobList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.Job.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.Job.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.Job.remove']">
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
    <JobEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getJobList,
  addJob,
  updateJob,
  deleteJobById,
} from '@/api/job/list/api'
import type { Job } from '@/api/job/list/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { dataCallback } from '@/utils/pagination'
import JobEditDialog from './components/JobEditDialog.vue'

const onChangeStatus = async (val: boolean, row: Job.ResJobList) => {
  const params: any = {
    jobId: row.jobId,
    status: val ? 1 : 0,
  }
  await useHandleData(updateJob, params, val ? `启用` : `禁用`)
}

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'title', label: '职位', search: { el: 'input', key: 'title' } },
  { prop: 'salary', label: '薪酬' },
  { prop: 'companyName', label: '公司' },
  { prop: 'location', label: '工作地点' },
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
    prop: 'publishTime',
    label: '发布时间',
    sortable: true,
    search: { el: 'date-range-picker', isElement: false, key: 'publishTime' },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 },
]

// 打开Dialog
const DialogRef = ref()
const openDialog = (title: string, rowData: Partial<Job.ResJobList> = {}) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addJob : updateJob,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: Job.ResJobList) => {
  await useHandleData(deleteJobById, row.jobId, `删除${row.title}`)
  proTable.value.getTableList()
}
</script>

<style lang="scss" scoped></style>
