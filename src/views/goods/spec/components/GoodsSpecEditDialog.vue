<!-- 编辑商品规格 -->
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
      <el-form-item label="规格名" prop="specName">
        <el-input
          v-model="formData!.specName"
          placeholder="请填写规格名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="分类ID" prop="categoryId">
        <el-input
          v-model="formData!.categoryId"
          placeholder="请填写分类ID"
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
      <el-form-item label="属性值" prop="values">
        <MutilTextInput
          :data="formData!.values"
          :label="''"
          :dataKey="'specVal'"
          :placeholder="'回车输入属性值'"
        />
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

<script setup lang="ts" name="GoodsSpecEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { GoodsSpec } from '@/api/goods/spec/type'

interface DialogProps {
  title: string
  rowData?: GoodsSpec.ResGoodsSpecList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

let formData = ref<GoodsSpec.ResGoodsSpecList>()

const rules = reactive({
  specName: [{ required: true, message: '请填写规格名' }],
  categoryId: [{ required: true, message: '请填写分类ID' }],
  seq: [{ required: true, message: '请填写排序值' }],
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
      ElMessage.success({ message: `${dialogProps.value.title}规格成功！` })
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
