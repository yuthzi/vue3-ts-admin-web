<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}`"
  >
    <el-form label-width="100px" label-suffix=" :">
      <el-form-item label="角色名称">
        <el-input
          disabled
          v-model="drawerProps.rowData!.roleName"
          placeholder="请填写角色名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限列表" prop="permissionId">
        <div class="tree-border">
          <el-tree
            ref="treeRef"
            node-key="menuId"
            show-checkbox
            default-expand-all
            :default-checked-keys="checkedKeys"
            :data="allPermission"
            :props="defaultProps"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref } from 'vue'
import { ElMessage, ElTree } from 'element-plus'
import type { Permission } from '@/api/acl/types'
interface DrawerProps {
  title: string
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})

const defaultProps = {
  children: 'children',
  label: 'menuName',
}
const allPermission = ref<Permission.ResPermisionList[]>([])
const checkedKeys = ref<string[]>([])
const loading = ref<boolean>(false)
const treeRef = ref<InstanceType<typeof ElTree>>()

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  const { list } = params
  drawerProps.value = params
  drawerVisible.value = true
  allPermission.value = list.data
  checkedKeys.value = getCheckedIds(list.data)
}

// 获取选中的id
const getCheckedIds = (
  auths: Permission.ResPermisionList[],
  initArr: string[] = [],
): string[] => {
  auths.forEach((item: Permission.ResPermisionList) => {
    if (item.select) {
      initArr.push(item.menuId as string)
    }
    if (item.children) {
      getCheckedIds(item.children, initArr)
    }
  })
  return initArr
}

const handleSubmit = async () => {
  try {
    // 获取selectdKeys
    const checkedKeys = treeRef.value?.getCheckedKeys() || []
    const params = {
      roleId: drawerProps.value.rowData.roleId,
      menuIdList: checkedKeys,
    }
    loading.value = true
    await drawerProps.value.api!(params)
    ElMessage.success({ message: `${drawerProps.value.title}成功！` })
    drawerProps.value.getTableList!()
    drawerVisible.value = false
    // 角色分配成功，刷新当前页面
    window.location.reload()
    loading.value = false
  } catch (error) {
    loading.value = true
    console.log(error)
  }
}

defineExpose({
  acceptParams,
})
</script>
<style lang="scss" scoped>
.tree-border {
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 2.5px;
}
</style>
