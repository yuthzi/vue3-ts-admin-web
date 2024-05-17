<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :id="`customerId`"
      :columns="columns"
      :requestApi="getClientUserList"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="danger"
          link
          icon="Lock"
          v-auth="['btn.User.update']"
          v-if="scope.row.status"
          @click="handleLock(scope.row)"
        >
          封禁
        </el-button>
        <el-button
          type="primary"
          link
          icon="Unlock"
          v-else
          v-auth="['btn.User.update']"
          @click="handleLock(scope.row)"
        >
          启用
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { getClientUserList, lockClientUser } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { ClientUser } from '@/api/client-user/types'
import { useHandleData } from '@/hooks/useHandleData'
// *表格配置项
const columns: ColumnProps[] = [
  // { type: 'index', label: '#', width: 80 },
  { prop: 'customerId', label: 'id' },
  {
    prop: 'nickname',
    label: '姓名',
    search: { el: 'input', key: 'nickname' },
  },
  { prop: 'username', label: '登录名' },
  {
    prop: 'gender',
    label: '性别',
    enum: [
      {
        value: 0,
        label: '保密',
      },
      {
        value: 1,
        label: '男',
      },
      {
        value: 2,
        label: '女',
      },
    ],
  },
  { prop: 'levelScore', label: '积分' },
  { prop: 'levelName', label: '会员等级' },
  { prop: 'phone', label: '手机号' },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }) => {
      return (
        <>
          <el-tag type={row.status ? 'success' : 'danger'}>
            {row.status ? '启用' : '禁用'}
          </el-tag>
        </>
      )
    },
  },
  { prop: 'gmtCreate', label: '创建时间', sortable: true, width: 180 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 100 },
]
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

// 锁定用户
const handleLock = async (row: ClientUser.ResClientUserList) => {
  const status = row.status ? 0 : 1
  await useHandleData(
    lockClientUser,
    { customerId: row.customerId, status: status },
    `${status ? '启用' : '封禁'}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
