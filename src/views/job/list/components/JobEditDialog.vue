<!-- 编辑招聘 -->
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
      <el-form-item label="职位" prop="title">
        <el-input
          v-model="formData!.title"
          placeholder="请填写职位"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="工作年限" prop="jobYear">
        <el-input
          v-model="formData!.jobYear"
          placeholder="请填写工作年限"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="jobDegree">
        <el-input
          v-model="formData!.jobDegree"
          placeholder="请填写学历"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-input
          v-model="formData!.tag"
          placeholder="请填写标签"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="薪酬" prop="salary">
        <el-input
          v-model="formData!.salary"
          placeholder="请填写薪酬"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="location">
        <el-input
          v-model="formData!.location"
          placeholder="请填写工作地点"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="工作详情" prop="detail">
        <el-input
          v-model="formData!.detail"
          placeholder="请填写工作详情"
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

<script setup lang="ts" name="JobEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { Job } from '@/api/job/list/type'

interface DialogProps {
  title: string
  rowData?: Job.ResJobList
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

let formData = ref<Job.ResJobList>()

const rules = reactive({
  platformId: [{ required: true, message: '请填写招聘平台ID' }],
  signLow: [{ required: true, message: '请填写摘要，低位' }],
  signHight: [{ required: true, message: '请填写摘要，高位' }],
  title: [{ required: true, message: '请填写职位' }],
  jobYear: [{ required: true, message: '请填写工作年限' }],
  jobDegree: [{ required: true, message: '请填写学历' }],
  tag: [{ required: true, message: '请填写标签' }],
  salary: [{ required: true, message: '请填写薪酬' }],
  companyName: [{ required: true, message: '请填写公司' }],
  companyUrl: [{ required: true, message: '请填写公司url' }],
  location: [{ required: true, message: '请填写工作地点' }],
  detail: [{ required: true, message: '请填写工作详情' }],
  sourceUrl: [{ required: true, message: '请填写原网址' }],
  status: [{ required: true, message: '请填写状态' }],
  publishTime: [{ required: true, message: '请填写发布时间' }],
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
      ElMessage.success({ message: `${dialogProps.value.title}招聘成功！` })
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
