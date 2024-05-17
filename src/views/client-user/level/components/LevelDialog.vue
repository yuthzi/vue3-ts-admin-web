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
      <el-form-item label="等级名称" prop="levelName">
        <el-input
          v-model="dialogProps.rowData!.levelName"
          placeholder="请填写等级名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="等级描述" prop="levelDesc">
        <el-input
          v-model="dialogProps.rowData!.levelDesc"
          placeholder="请填写等级描述"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="所需积分" prop="minScore">
        <el-input
          v-model="dialogProps.rowData!.minScore"
          placeholder="请填写所需积分"
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

<script setup lang="ts" name="LevelDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { ClientUser } from '@/api/client-user/types'

interface DialogProps {
  title: string
  rowData?: ClientUser.ResLevelList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const rules = reactive({
  levelName: [
    { required: true, message: '请填写等级名称' },
    { min: 2, message: '等级名不能小于2位' },
  ],
  minScore: [{ required: true, message: '请填写所需积分' }],
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
      ElMessage.success({ message: `${dialogProps.value.title}等级成功！` })
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
