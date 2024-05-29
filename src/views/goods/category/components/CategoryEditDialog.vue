<!-- 编辑分类 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogProps.title"
    :destroy-on-close="true"
    width="580px"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="formData"
    >
      <el-form-item label="分类名称" prop="categoryName">
        <el-input
          v-model="formData!.categoryName"
          placeholder="请填写分类名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="seq">
        <el-input
          v-model="formData!.seq"
          placeholder="请填写排序值"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="statusValue"
          placeholder="请填写状态"
          @change="handleStatusChange"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="CategoryEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { Category } from '@/api/goods/category/type'

interface DialogProps {
  isAdd: boolean
  title: string
  rowData?: Category.ResCategoryList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const statusOptions = [
  {
    value: 0,
    label: '禁用',
  },
  {
    value: 1,
    label: '启用',
  },
]

const statusValue = ref()

let formData = ref<Category.ReqAddCategory>()

const rules = reactive({
  pid: [{ required: true, message: '请填写父级分类ID' }],
  categoryName: [{ required: true, message: '请填写分类名称' }],
  seq: [{ required: true, message: '请填写排序值' }],
  status: [{ required: true, message: '请填写状态' }],
})

const dialogVisible = ref(false)
const loading = ref<boolean>(false)
// props定义
// title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({ isAdd: true, title: '' })
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true

  const row: any = params.rowData
  if (params.isAdd) {
    formData.value = {
      pid: row.categoryId,
      seq: row.children ? row.children.length + 1 : 1,
    }
    // statusValue.value = undefined
  } else {
    formData.value = row
  }

  // 初始化status
  const status = statusOptions.find((e) => e.value == formData.value!.status)
  statusValue.value = status === undefined ? '' : status
}

const handleStatusChange = () => {
  formData!.value!.status = statusValue.value
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(formData.value)
      ElMessage.success({ message: `${dialogProps.value.title}分类成功！` })
      dialogProps.value.getTableList!()
      dialogVisible.value = false
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  })
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
