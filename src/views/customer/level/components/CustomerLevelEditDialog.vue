<!-- 编辑客户等级 -->
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
      <el-form-item label="等级名称" prop="levelName">
        <el-input
          v-model="formData!.levelName"
          placeholder="请填写等级名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="等级描述" prop="levelDesc">
        <el-input
          v-model="formData!.levelDesc"
          placeholder="请填写等级描述"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="最小积分" prop="minScore">
        <el-input
          v-model="formData!.minScore"
          placeholder="请填写所需最小积分"
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

<script setup lang="ts" name="CustomerLevelEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { CustomerLevel } from '@/api/customer/level/type'

interface DialogProps {
  title: string
  rowData?: CustomerLevel.ResCustomerLevelList
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

let formData = ref<CustomerLevel.ResCustomerLevelList>()

const rules = reactive({
  levelName: [{ required: true, message: '请填写等级名称' }],
  levelDesc: [{ required: true, message: '请填写等级描述' }],
  minScore: [{ required: true, message: '请填写所需最小积分' }],
  status: [{ required: true, message: '请填写状态' }],
})

const dialogVisible = ref(false)
const loading = ref<boolean>(false)
// props定义
// title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({ title: '' })
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
  formData.value = params.rowData

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
      ElMessage.success({ message: `${dialogProps.value.title}客户等级成功！` })
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
