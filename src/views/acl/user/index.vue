<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="`userId`"
      :dataCallback="dataCallback"
      :columns="columns"
      :searchCol="searchCol"
      :requestApi="getAclUserList"
      :initParam="initParam"
    >
      <template #tableHeader="scope">
        <el-button
          type="primary"
          icon="Plus"
          v-auth="['btn.User.add']"
          @click="openDrawer('新增')"
        >
          添加
        </el-button>
        <el-button
          type="danger"
          icon="Delete"
          plain
          v-auth="['btn.User.remove']"
          @click="batchDelete(scope.selectedListIds)"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="UserFilled"
          v-auth="['btn.User.assgin']"
          @click="openDrawer('分配角色', scope.row)"
        >
          分配角色
        </el-button>
        <el-button
          type="primary"
          link
          icon="Edit"
          v-auth="['btn.User.update']"
          @click="openDrawer('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          v-auth="'btn.User.remove'"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import UserDrawer from './components/UserDrawer.vue'
import type { AclUser } from '@/api/acl/types'
import { useHandleData } from '@/hooks/useHandleData'
import { ElMessage } from 'element-plus'
import { dataCallback } from '@/utils/pagination'

import {
  getAclUserList,
  addAclUser,
  updateAclUser,
  deleteAclUserById,
  batchAclUser,
  getUserRolesList,
  assignUserRoles,
} from '@/api'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

const beforeChangeEnable = (val: boolean, row: any) => {
  if (row?.username === 'admin') {
    ElMessage({
      type: 'warning',
      message: `系统用户不允许修改`,
    })
    return false
  }

  return true
}

const onChangeEnable = async (val: boolean, row: any) => {
  const params: any = {
    userId: row.userId,
    enable: val ? 1 : 0,
  }
  await useHandleData(
    updateAclUser,
    params,
    val ? `启用${row.nickname}用户` : `禁用${row.nickname}用户`,
  )
}

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  // { type: 'default', prop: 'userId', label: 'id' },
  {
    prop: 'username',
    label: '用户名',
    search: {
      el: 'input',
      props: { placeholder: '输入用户名' },
    },
  },
  {
    prop: 'nickname',
    label: '用户昵称',
    search: { el: 'input', props: { placeholder: '输入用户昵称' } },
  },
  { prop: 'roleName', label: '角色列表' },
  {
    type: 'switch',
    prop: 'enable',
    label: '是否启用',
    beforeChange: beforeChangeEnable,
    onChange: onChangeEnable,
  },
  { prop: 'gmtCreate', label: '创建时间', sortable: true },
  { prop: 'gmtModified', label: '更新时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// 搜索项宽度
// const searchCol = { xl: 4 }
const searchCol = 5

// *查询参数
const initParam = reactive({})

// *新增、编辑、分配角色
const drawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<AclUser.ResAclUserList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    list:
      title === '分配角色' ? await getUserRolesList(rowData!.userId || '') : [],
    api:
      title === '新增'
        ? addAclUser
        : title === '编辑'
        ? updateAclUser
        : assignUserRoles,
    getTableList: proTable.value.getTableList,
  }
  drawerRef.value.acceptParams(params)
}

// *根据id删除用户
const handleDelete = async (row: AclUser.ResAclUserList) => {
  if (row?.username === 'admin') {
    ElMessage({
      type: 'warning',
      message: `系统用户不允许删除`,
    })
    return
  }
  await useHandleData(deleteAclUserById, row.userId, `删除${row.username}用户`)
  proTable.value.getTableList()
}

// *批量删除用户
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchAclUser, ids, '删除所选用户信息')
  proTable.value.clearSelection()
  proTable.value.getTableList()
}
</script>
