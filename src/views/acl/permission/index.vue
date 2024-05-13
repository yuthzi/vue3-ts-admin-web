<template>
  <div>
    <ProTable ref="proTable" :selectId="`menuId`" :pagination="false" :toolButton="false" :columns="columns"
      :requestApi="getPermissionList">
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button text size="large" class="arrow" type="primary" title="下移" @click="moveupOrmovedown(scope.row, false)"
          icon="Bottom" v-if="scope.row.level < 3">
        </el-button>
        <el-button text size="large" class="arrow" type="primary" title="上移" @click="moveupOrmovedown(scope.row, true)"
          icon="Top" v-if="scope.row.level < 3">
        </el-button>
        <el-button type="primary" link v-if="BUTTONS['btn.Permission.add']" icon="UserFilled"
          :disabled="scope.row.level === 3" @click="openDialog(1, scope.row)">
          {{ scope.row.level >= 2 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button type="primary" link v-if="BUTTONS['btn.Permission.update']" icon="Edit"
          @click="openDialog(2, scope.row)">
          编辑
        </el-button>
        <el-button type="primary" link icon="Delete" v-if="BUTTONS['btn.Permission.remove']"
          @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </ProTable>
    <PermissonDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHandleData } from '@/hooks/useHandleData'
import {
  getPermissionList,
  deletePermission,
  updatePermission,
  addPermission,
} from '@/api'
import type { Permission } from '@/api/acl/types'
import PermissonDialog from './components/PermissionDialog.vue'
import { useAuthButtons } from '@/hooks/useAuthButtons'

const { BUTTONS } = useAuthButtons()

const columns = [
  { prop: 'menuName', label: '名称', align: 'left' },
  { prop: 'code', label: '权限值' },
  { type: 'index', label: '#', isShow: false },
  { prop: 'seq', label: '排序值' },
  { prop: 'pattern', label: 'URL' },
  { prop: 'gmtModified', label: '修改时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 300 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()
// 打开Dialog
const DialogRef = ref()
const openDialog = (type: number, rowData: Permission.ResPermisionList) => {
  const params = {
    type,
    rowData: { ...rowData },
    api: type == 1 ? addPermission : updatePermission,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}
// *根据id删除菜单
const handleDelete = async (row: Partial<Permission.ResPermisionList> = {}) => {
  await useHandleData(
    deletePermission,
    row?.menuId as string,
    `删除${row.menuName}`,
  )
  proTable.value.getTableList()
}

function moveupOrmovedown(row: any, isUp: boolean) {
  // debugger
  console.log(row.index)
  
  // selectedList
  let data = proTable.value.tableData
  // 1 is first level
  if (row.level == 1) {
    // index传入是undefined，原因未知。所以这里查找index
    const idx = data.findIndex((item: any) => item.menuId === row.menuId)
    moveRow(data, row, idx, isUp)
  } else if (row.level == 2) {
    const idx = data.findIndex((item: any) => item.menuId === row.pid)
    const childIdx = data[idx].children.findIndex(
      (item: any) => item.menuId === row.menuId,
    )
    moveRow(data[idx].children, row, childIdx, isUp)
  }
}

function moveRow(data: any[], row: any, idx: number, isUp: boolean) {
  if (isUp) {
    data.splice(idx, 1)
    data.splice(idx - 1, 0, row)
  } else {
    data.splice(idx, 1)
    data.splice(idx + 1, 0, row)
  }
}
</script>

<style scoped lang="scss">
.arrow {
  margin-left: 2px;
  padding: 2px;
}
</style>
