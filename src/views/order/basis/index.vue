<!-- 订单基本信息管理视图页面 -->
<template>
  <div>
    <ProTable
      ref="proTable"
      :selectId="`orderId`"
      :columns="columns"
      :requestApi="getOrderBasisList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.OrderBasis.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.OrderBasis.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.OrderBasis.remove']">
          <el-button
            type="primary"
            link
            icon="Delete"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </Auth>
      </template>
    </ProTable>
    <OrderBasisEditDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  getOrderBasisList,
  addOrderBasis,
  updateOrderBasis,
  deleteOrderBasisById,
} from '@/api/order/basis/api'
import type { OrderBasis } from '@/api/order/basis/type'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import OrderBasisEditDialog from './components/OrderBasisEditDialog.vue'

const onChangeDispatchStatus = async (
  val: boolean,
  row: OrderBasis.ResOrderBasisList,
) => {
  const params: any = {
    orderId: row.orderId,
    dispatchStatus: val ? 1 : 0,
  }
  await useHandleData(updateOrderBasis, params, val ? `启用` : `禁用`)
}

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'orderId', label: 'id' },
  {
    prop: 'orderSource',
    label: '订单来源',
    enum: [
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
    ],
  },
  {
    prop: 'orderType',
    label: '订单类型',
    enum: [
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
    ],
  },
  {
    prop: 'orderStatus',
    label: '订单状态',
    enum: [
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
    ],
  },
  {
    prop: 'payStatus',
    label: '支付状态',
    enum: [
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
    ],
  },
  {
    type: 'switch',
    prop: 'dispatchStatus',
    label: '发货状态',
    onChange: onChangeDispatchStatus,
    activeValue: 1,
    inactiveValue: 0,
  },
  {
    prop: 'returnStatus',
    label: '售后状态',
    enum: [
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
    ],
  },
  { prop: 'memo', label: '备注' },
  {
    prop: 'payType',
    label: '支付方式',
    enum: [
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
    ],
  },
  { prop: 'orderAmount', label: '订单金额' },
  { prop: 'bizTime', label: '业务发生时间' },
  { prop: 'gmtCreate', label: '创建时间', sortable: true },
  { prop: 'gmtModified', label: '更新时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 },
]

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

// 打开Dialog
const DialogRef = ref()
const openDialog = (
  title: string,
  rowData: Partial<OrderBasis.ResOrderBasisList> = {},
) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addOrderBasis : updateOrderBasis,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *根据id删除
const handleDelete = async (row: OrderBasis.ResOrderBasisList) => {
  await useHandleData(
    deleteOrderBasisById,
    row.orderId,
    `删除\$\{row.orderBasisName\}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
