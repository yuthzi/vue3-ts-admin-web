<!-- 编辑表信息 -->
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
      <el-form-item label="表名" prop="tableName">
        <el-input
          v-model="formData!.tableName"
          placeholder="请填写表名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="实体名" prop="entityName">
        <el-input
          v-model="formData!.entityName"
          placeholder="请填写实体名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="表注释" prop="memo">
        <el-input
          v-model="formData!.memo"
          placeholder="请填写表注释"
          clearable
        ></el-input>
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

<script setup lang="ts" name="SysTableEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { SysTable } from '@/api/sys/table/type'

interface DialogProps {
  title: string
  rowData?: SysTable.ResSysTableList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

let formData = ref<SysTable.ResSysTableList>()

const rules = reactive({
  tableName: [{ required: true, message: '请填写表名' }],
  entityName: [{ required: true, message: '请填写实体名' }],
  memo: [{ required: true, message: '请填写表注释' }],
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
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(formData.value)
      ElMessage.success({ message: `${dialogProps.value.title}表信息成功！` })
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
