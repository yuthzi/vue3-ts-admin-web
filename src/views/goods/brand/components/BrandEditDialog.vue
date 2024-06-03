<!-- 编辑品牌 -->
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
      <el-form-item label="品牌名称" prop="brandName">
        <el-input
          v-model="formData!.brandName"
          placeholder="请填写品牌名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="首字母" prop="initial">
        <el-input
          v-model="formData!.initial"
          placeholder="请填写品牌名首字母"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌Logo" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          :action="`dev-api/admin/product/fileUpload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="formData!.logoUrl"
            :src="formData!.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip">只能上传jpg/png文件，且不超过50kb</div>
          </template>
        </el-upload>
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

<script setup lang="ts" name="BrandEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance, UploadProps } from 'element-plus'
import type { Brand } from '@/api/goods/brand/type'

interface DialogProps {
  title: string
  rowData?: Brand.ResBrandList
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

let formData = ref<Brand.ResBrandList>()

const rules = reactive({
  brandName: [{ required: true, message: '请填写品牌名称' }],
  logoUrl: [{ required: true, message: '请上传品牌Logo' }],
  seq: [{ required: true, message: '请填写排序值' }],
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

  // 初始化status
  const status = statusOptions.find((e) => e.value == formData.value!.status)
  statusValue.value = status === undefined ? '' : status
}

const handleStatusChange = () => {
  formData!.value!.status = statusValue.value
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (res, file) => {
  // 保存请求返回的图片url数据
  console.log(res, file)
  formData!.value!.logoUrl = res.data
}

const beforeAvatarUpload = (file: any) => {
  const isJPGOrPNG = ['image/jpeg', 'image/png'].indexOf(file.type) >= 0
  const isLt50K = file.size / 1024 < 50

  if (!isJPGOrPNG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
  }
  if (!isLt50K) {
    ElMessage.error('上传头像图片大小不能超过 50K!')
  }
  return isJPGOrPNG && isLt50K
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(formData.value)
      ElMessage.success({ message: `${dialogProps.value.title}品牌成功！` })
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
<style lang="scss" scoped>
.avatar-uploader {
  :deep(.el-upload) {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    transition: var(--el-transition-duration-fast);
  }
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>
