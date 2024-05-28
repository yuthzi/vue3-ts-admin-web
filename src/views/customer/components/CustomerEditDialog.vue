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
      :model="formData"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formData!.username"
          placeholder="请填写用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="nickname">
        <el-input
          v-model="formData!.nickname"
          placeholder="请填写姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select
          v-model="genderValue"
          placeholder="请填写性别"
          @change="handleGenderChange"
        >
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="等级积分" prop="levelScore">
        <el-input
          v-model="formData!.levelScore"
          placeholder="请填写等级积分"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="等级名称" prop="levelName">
        <el-input
          v-model="formData!.levelName"
          placeholder="请填写等级名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData!.password"
          placeholder="请填写密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          v-model="formData!.phone"
          placeholder="请填写联系电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input
          v-model="formData!.avatar"
          placeholder="请填写头像"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input
          v-model="formData!.status"
          placeholder="请填写状态"
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

const genderOptions = [
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
]

const genderValue = ref()

let formData = ref<Customer.ResCustomerList>()

const rules = reactive({
  username: [{ required: true, message: '请填写用户名' }],
  nickname: [{ required: true, message: '请填写姓名' }],
  gender: [{ required: true, message: '请填写性别' }],
  levelScore: [{ required: true, message: '请填写等级积分' }],
  levelName: [{ required: true, message: '请填写等级名称' }],
  password: [{ required: true, message: '请填写密码' }],
  phone: [{ required: true, message: '请填写联系电话' }],
  avatar: [{ required: true, message: '请填写头像' }],
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

  // 初始化gender
  const gender = genderOptions.find((e) => e.value == params.rowData?.gender)
  genderValue.value = gender === undefined ? '' : gender
}

const handleGenderChange = () => {
  formData!.value!.gender = genderValue.value
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
