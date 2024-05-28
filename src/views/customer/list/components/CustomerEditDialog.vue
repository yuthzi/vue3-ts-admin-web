<!-- 编辑客户 -->
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
      :model="dialogProps.rowData"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="dialogProps.rowData!.username"
          placeholder="请填写用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="nickname">
        <el-input
          v-model="dialogProps.rowData!.nickname"
          placeholder="请填写姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input
          v-model="dialogProps.rowData!.gender"
          placeholder="请填写性别"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="dialogProps.rowData!.password"
          placeholder="请填写密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          v-model="dialogProps.rowData!.phone"
          placeholder="请填写联系电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input
          v-model="dialogProps.rowData!.avatar"
          placeholder="请填写头像"
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

<script setup lang="ts" name="CustomerEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { Customer } from '@/api/customer/type'

interface DialogProps {
  title: string
  rowData?: Customer.ResCustomerList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const rules = reactive({
  username: [{ required: true, message: '请填写用户名' }],
  nickname: [{ required: true, message: '请填写姓名' }],
  gender: [{ required: true, message: '请填写性别' }],
  phone: [{ required: true, message: '请填写联系电话' }],
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
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(dialogProps.value.rowData)
      ElMessage.success({ message: `${dialogProps.value.title}客户成功！` })
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
