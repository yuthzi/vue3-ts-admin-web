/*
 * 订单基本信息模型定义
 * @Author: yuth
 * @Date: 2024-05-28 22:44:12
 * @Description: 订单基本信息
 */
import type { ReqPage } from '@/api/types'

/*
 * 订单基本信息管理模块
 */
export namespace OrderBasis {
  export interface ReqAddOrderBasis {
    tenantId?: string
    orderSource?: string
    orderType?: string
    orderStatus?: string
    payStatus?: string
    dispatchStatus?: string
    returnStatus?: string
    memo?: string
    payType?: string
    orderAmount?: string
    bizTime?: string
  }

  export interface ReqUpdateOrderBasis {
    orderId: string
    tenantId?: string
    orderSource?: string
    orderType?: string
    orderStatus?: string
    payStatus?: string
    dispatchStatus?: string
    returnStatus?: string
    memo?: string
    payType?: string
    orderAmount?: string
    bizTime?: string
  }

  export interface ReqOrderBasisList extends ReqPage {
    orderId?: string
    tenantId?: string
    orderSource?: string
    orderType?: string
    orderStatus?: string
    payStatus?: string
    dispatchStatus?: string
    returnStatus?: string
    memo?: string
    payType?: string
    orderAmount?: string
    bizTime?: string
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResOrderBasisList {
    orderId: string
    tenantId?: string
    orderSource?: string
    orderType?: string
    orderStatus?: string
    payStatus?: string
    dispatchStatus?: string
    returnStatus?: string
    memo?: string
    payType?: string
    orderAmount?: string
    bizTime?: string
    gmtCreate?: string
    gmtModified?: string
  }
}
