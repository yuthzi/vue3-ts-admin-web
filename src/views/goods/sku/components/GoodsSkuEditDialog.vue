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
      :model="formData"
    >
      <el-form-item label="规格" prop="spec">
        <el-input
          v-model="formData!.spec"
          placeholder="请填写规格"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input
          v-model="formData!.unit"
          placeholder="请填写计量单位"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="销售价" prop="sellingPrice">
        <el-input
          v-model="formData!.sellingPrice"
          placeholder="请填写销售价"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input
          v-model="formData!.quantity"
          placeholder="请填写数量"
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
import type { GoodsSku } from '@/api/goods/sku/type'

interface DialogProps {
  title: string
  rowData?: GoodsSku.ResGoodsSkuList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

let formData = ref<GoodsSku.ResGoodsSkuList>()

const rules = reactive({
  spuId: [{ required: true, message: '请填写SPU ID' }],
  spec: [{ required: true, message: '请填写规格' }],
  unit: [{ required: true, message: '请填写计量单位' }],
  sellingPrice: [{ required: true, message: '请填写销售价' }],
  quantity: [{ required: true, message: '请填写数量' }],
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
