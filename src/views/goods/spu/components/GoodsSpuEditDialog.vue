
<!-- 编辑SPU -->
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
     <el-form-item label="商品名称" prop="goodsName">
        <el-input
          v-model="dialogProps.rowData!.goodsName"
          placeholder="请填写商品名称"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="顾客端的名称" prop="goodsTitle">
        <el-input
          v-model="dialogProps.rowData!.goodsTitle"
          placeholder="请填写顾客端的名称"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="分类ID" prop="categoryId">
        <el-input
          v-model="dialogProps.rowData!.categoryId"
          placeholder="请填写分类ID"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="品牌ID" prop="brandId">
        <el-input
          v-model="dialogProps.rowData!.brandId"
          placeholder="请填写品牌ID"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="品牌名称" prop="brandName">
        <el-input
          v-model="dialogProps.rowData!.brandName"
          placeholder="请填写品牌名称"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="助记码" prop="mneCode">
        <el-input
          v-model="dialogProps.rowData!.mneCode"
          placeholder="请填写助记码"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="货号" prop="artNo">
        <el-input
          v-model="dialogProps.rowData!.artNo"
          placeholder="请填写货号"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="规格ID" prop="specId">
        <el-input
          v-model="dialogProps.rowData!.specId"
          placeholder="请填写规格ID"
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
     <el-form-item label="商品售价" prop="sellingPrice">
        <el-input
          v-model="dialogProps.rowData!.sellingPrice"
          placeholder="请填写商品售价"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="商品介绍" prop="intro">
        <el-input
          v-model="dialogProps.rowData!.intro"
          placeholder="请填写商品介绍"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="主图路径" prop="picUrl">
        <el-input
          v-model="dialogProps.rowData!.picUrl"
          placeholder="请填写主图路径"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="是否已审核" prop="isAudited">
        <el-input
          v-model="dialogProps.rowData!.isAudited"
          placeholder="请填写是否已审核"
          clearable
        ></el-input>
       </el-form-item>
     <el-form-item label="排序" prop="seq">
        <el-input
          v-model="dialogProps.rowData!.seq"
          placeholder="请填写排序"
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

<script setup lang="ts" name="GoodsSpuEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { GoodsSpu } from '@/api//goods/spu/type'

interface DialogProps {
  title: string
  rowData?: GoodsSpu.ResGoodsSpuList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const rules = reactive({
     goodsName: [{ required: true, message: '请填写商品名称' }],
     goodsTitle: [{ required: true, message: '请填写顾客端的名称' }],
     categoryId: [{ required: true, message: '请填写分类ID' }],
     brandId: [{ required: true, message: '请填写品牌ID' }],
     brandName: [{ required: true, message: '请填写品牌名称' }],
     mneCode: [{ required: true, message: '请填写助记码' }],
     artNo: [{ required: true, message: '请填写货号' }],
     specId: [{ required: true, message: '请填写规格ID' }],
     unit: [{ required: true, message: '请填写计量单位' }],
     sellingPrice: [{ required: true, message: '请填写商品售价' }],
     intro: [{ required: true, message: '请填写商品介绍' }],
     picUrl: [{ required: true, message: '请填写主图路径' }],
     isAudited: [{ required: true, message: '请填写是否已审核' }],
     seq: [{ required: true, message: '请填写排序' }],
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
      ElMessage.success({ message: `${dialogProps.value.title}SPU成功！` })
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
