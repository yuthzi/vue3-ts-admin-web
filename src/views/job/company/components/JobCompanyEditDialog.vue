<!-- 编辑招聘公司 -->
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
      <el-form-item label="公司名" prop="companyName">
        <el-input
          v-model="formData!.companyName"
          placeholder="请填写公司名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="公司标签" prop="companyTag">
        <el-input
          v-model="formData!.companyTag"
          placeholder="请填写公司标签"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="地点" prop="location">
        <el-input
          v-model="formData!.location"
          placeholder="请填写地点"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="公司规模" prop="scale">
        <el-input
          v-model="formData!.scale"
          placeholder="请填写公司规模"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="行业" prop="business">
        <el-input
          v-model="formData!.business"
          placeholder="请填写行业"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="融资阶段" prop="stage">
        <el-input
          v-model="formData!.stage"
          placeholder="请填写融资阶段"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="公司介绍" prop="introduction">
        <el-input
          v-model="formData!.introduction"
          placeholder="请填写公司介绍"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="原网址" prop="sourceUrl">
        <el-input
          v-model="formData!.sourceUrl"
          placeholder="请填写原网址"
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

<script setup lang="ts" name="JobCompanyEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { JobCompany } from '@/api/job/company/type'

interface DialogProps {
  title: string
  rowData?: JobCompany.ResJobCompanyList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

let formData = ref<JobCompany.ResJobCompanyList>()

const rules = reactive({
  platformId: [{ required: true, message: '请填写招聘平台ID' }],
  signLow: [{ required: true, message: '请填写摘要，低位' }],
  signHight: [{ required: true, message: '请填写摘要，高位' }],
  companyName: [{ required: true, message: '请填写公司名' }],
  companyTag: [{ required: true, message: '请填写公司标签' }],
  location: [{ required: true, message: '请填写地点' }],
  scale: [{ required: true, message: '请填写公司规模' }],
  business: [{ required: true, message: '请填写行业' }],
  stage: [{ required: true, message: '请填写融资阶段' }],
  introduction: [{ required: true, message: '请填写公司介绍' }],
  sourceUrl: [{ required: true, message: '请填写原网址' }],
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
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(formData.value)
      ElMessage.success({ message: `${dialogProps.value.title}招聘公司成功！` })
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
