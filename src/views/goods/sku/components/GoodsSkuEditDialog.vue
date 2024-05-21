
<!-- 编辑SKU -->
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
     <el-form-item label="SPU ID" prop="spuId">
        <el-input
          v-model="dialogProps.rowData!.spuId"
          placeholder="请填写SPU ID"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="规格" prop="spec">
        <el-input
          v-model="dialogProps.rowData!.spec"
          placeholder="请填写规格"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="计量单位" prop="unit">
        <el-input
          v-model="dialogProps.rowData!.unit"
          placeholder="请填写计量单位"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="销售价" prop="sellingPrice">
        <el-input
          v-model="dialogProps.rowData!.sellingPrice"
          placeholder="请填写销售价"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="数量" prop="quantity">
        <el-input
          v-model="dialogProps.rowData!.quantity"
          placeholder="请填写数量"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="下单锁定数量" prop="lockQuantity">
        <el-input
          v-model="dialogProps.rowData!.lockQuantity"
          placeholder="请填写下单锁定数量"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="版本号（用于乐观锁）" prop="version">
        <el-input
          v-model="dialogProps.rowData!.version"
          placeholder="请填写版本号（用于乐观锁）"
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

<script setup lang="ts" name="GoodsSkuEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { GoodsSku } from '@/api//goods/sku/type'

interface DialogProps {
  title: string
  rowData?: GoodsSku.ResGoodsSkuList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const rules = reactive({
     spuId: [{ required: true, message: '请填写SPU ID' }],
     spec: [{ required: true, message: '请填写规格' }],
     unit: [{ required: true, message: '请填写计量单位' }],
     sellingPrice: [{ required: true, message: '请填写销售价' }],
     quantity: [{ required: true, message: '请填写数量' }],
     lockQuantity: [{ required: true, message: '请填写下单锁定数量' }],
     version: [{ required: true, message: '请填写版本号（用于乐观锁）' }],
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
      ElMessage.success({ message: `${dialogProps.value.title}SKU成功！` })
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
