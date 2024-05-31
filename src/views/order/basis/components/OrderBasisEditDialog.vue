<!-- 编辑订单基本信息 -->
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
      <el-form-item label="订单来源" prop="orderSource">
        <el-select
          v-model="orderSourceValue"
          placeholder="请填写订单来源"
          @change="handleOrderSourceChange"
        >
          <el-option
            v-for="item in orderSourceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单类型" prop="orderType">
        <el-select
          v-model="orderTypeValue"
          placeholder="请填写订单类型"
          @change="handleOrderTypeChange"
        >
          <el-option
            v-for="item in orderTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-select
          v-model="orderStatusValue"
          placeholder="请填写订单状态"
          @change="handleOrderStatusChange"
        >
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付状态" prop="payStatus">
        <el-select
          v-model="payStatusValue"
          placeholder="请填写支付状态"
          @change="handlePayStatusChange"
        >
          <el-option
            v-for="item in payStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发货状态" prop="dispatchStatus">
        <el-select
          v-model="dispatchStatusValue"
          placeholder="请填写发货状态"
          @change="handleDispatchStatusChange"
        >
          <el-option
            v-for="item in dispatchStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="售后状态" prop="returnStatus">
        <el-select
          v-model="returnStatusValue"
          placeholder="请填写售后状态"
          @change="handleReturnStatusChange"
        >
          <el-option
            v-for="item in returnStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="formData!.memo"
          placeholder="请填写备注"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="支付方式" prop="payType">
        <el-select
          v-model="payTypeValue"
          placeholder="请填写支付方式"
          @change="handlePayTypeChange"
        >
          <el-option
            v-for="item in payTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单金额" prop="orderAmount">
        <el-input
          v-model="formData!.orderAmount"
          placeholder="请填写订单金额"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="业务发生时间" prop="bizTime">
        <el-input
          v-model="formData!.bizTime"
          placeholder="请填写业务发生时间"
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

<script setup lang="ts" name="OrderBasisEditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { OrderBasis } from '@/api/order/basis/type'

interface DialogProps {
  title: string
  rowData?: OrderBasis.ResOrderBasisList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const orderSourceOptions = [
  {
    value: 1,
    label: 'APP订单',
  },
  {
    value: 2,
    label: 'POS机',
  },
  {
    value: 3,
    label: '渠道单',
  },
]
const orderTypeOptions = [
  {
    value: 1,
    label: '正常订单',
  },
  {
    value: 2,
    label: '秒杀订单',
  },
  {
    value: 3,
    label: '团购单',
  },
]
const orderStatusOptions = [
  {
    value: 0,
    label: '待付款',
  },
  {
    value: 1,
    label: '待发货',
  },
  {
    value: 2,
    label: '已发货',
  },
  {
    value: 3,
    label: '已收货',
  },
  {
    value: 4,
    label: '已完成',
  },
  {
    value: 5,
    label: '已关闭',
  },
  {
    value: 6,
    label: '售后中',
  },
  {
    value: 10,
    label: '待自取',
  },
]
const payStatusOptions = [
  {
    value: 0,
    label: '未支付',
  },
  {
    value: 1,
    label: '正在支付',
  },
  {
    value: 2,
    label: '支付超时',
  },
  {
    value: 3,
    label: '支付失败',
  },
  {
    value: 4,
    label: '取消支付',
  },
  {
    value: 5,
    label: '已支付',
  },
]
const dispatchStatusOptions = [
  {
    value: 0,
    label: '未发货',
  },
  {
    value: 1,
    label: '已发货',
  },
]
const returnStatusOptions = [
  {
    value: -2,
    label: '禁止申请售后',
  },
  {
    value: -1,
    label: '未进入售后',
  },
  {
    value: 0,
    label: '退款待处理',
  },
  {
    value: 1,
    label: '退款中',
  },
  {
    value: 2,
    label: '已完成退款',
  },
  {
    value: 3,
    label: '拒绝退款',
  },
  {
    value: 4,
    label: '已取消退款',
  },
]
const payTypeOptions = [
  {
    value: 0,
    label: '未支付',
  },
  {
    value: 1,
    label: '余额',
  },
  {
    value: 2,
    label: '现金',
  },
  {
    value: 3,
    label: '网付',
  },
  {
    value: 4,
    label: '微信',
  },
  {
    value: 5,
    label: '支付宝',
  },
  {
    value: 99,
    label: '多种方式支付',
  },
]

const orderSourceValue = ref()
const orderTypeValue = ref()
const orderStatusValue = ref()
const payStatusValue = ref()
const dispatchStatusValue = ref()
const returnStatusValue = ref()
const payTypeValue = ref()

let formData = ref<OrderBasis.ResOrderBasisList>()

const rules = reactive({
  orderSource: [{ required: true, message: '请填写订单来源' }],
  orderType: [{ required: true, message: '请填写订单类型' }],
  orderStatus: [{ required: true, message: '请填写订单状态' }],
  payStatus: [{ required: true, message: '请填写支付状态' }],
  dispatchStatus: [{ required: true, message: '请填写发货状态' }],
  returnStatus: [{ required: true, message: '请填写售后状态' }],
  memo: [{ required: true, message: '请填写备注' }],
  payType: [{ required: true, message: '请填写支付方式' }],
  orderAmount: [{ required: true, message: '请填写订单金额' }],
  bizTime: [{ required: true, message: '请填写业务发生时间' }],
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

  // // 初始化orderSource
  // const orderSource = orderSourceOptions.find(
  //   (e: number) => e.value == params.rowData!.orderSource,
  // )
  // orderSourceValue.value = orderSource === undefined ? '' : orderSource

  // // 初始化orderType
  // const orderType = orderTypeOptions.find(
  //   (e) => e.value == params.rowData?.orderType,
  // )
  // orderTypeValue.value = orderType === undefined ? '' : orderType

  // // 初始化orderStatus
  // const orderStatus = orderStatusOptions.find(
  //   (e) => e.value == params.rowData?.orderStatus,
  // )
  // orderStatusValue.value = orderStatus === undefined ? '' : orderStatus

  // // 初始化payStatus
  // const payStatus = payStatusOptions.find(
  //   (e) => e.value == params.rowData?.payStatus,
  // )
  // payStatusValue.value = payStatus === undefined ? '' : payStatus

  // // 初始化dispatchStatus
  // const dispatchStatus = dispatchStatusOptions.find(
  //   (e) => e.value == params.rowData?.dispatchStatus,
  // )
  // dispatchStatusValue.value = dispatchStatus === undefined ? '' : dispatchStatus

  // // 初始化returnStatus
  // const returnStatus = returnStatusOptions.find(
  //   (e) => e.value == params.rowData?.returnStatus,
  // )
  // returnStatusValue.value = returnStatus === undefined ? '' : returnStatus

  // // 初始化payType
  // const payType = payTypeOptions.find((e) => e.value == params.rowData?.payType)
  // payTypeValue.value = payType === undefined ? '' : payType
}

const handleOrderSourceChange = () => {
  formData!.value!.orderSource = orderSourceValue.value
}

const handleOrderTypeChange = () => {
  formData!.value!.orderType = orderTypeValue.value
}

const handleOrderStatusChange = () => {
  formData!.value!.orderStatus = orderStatusValue.value
}

const handlePayStatusChange = () => {
  formData!.value!.payStatus = payStatusValue.value
}

const handleDispatchStatusChange = () => {
  formData!.value!.dispatchStatus = dispatchStatusValue.value
}

const handleReturnStatusChange = () => {
  formData!.value!.returnStatus = returnStatusValue.value
}

const handlePayTypeChange = () => {
  formData!.value!.payType = payTypeValue.value
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(dialogProps.value.rowData)
      ElMessage.success({
        message: `${dialogProps.value.title}订单基本信息成功！`,
      })
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
