/*
 * @Author: yuth
 * @Date: 2024-05-28 22:44:12
 * @Description: 订单基本信息
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { OrderBasis } from './type'

/**
 * @description 获取订单基本信息分页列表(带搜索)
 * @param {OrderBasis.ReqOrderBasisList} params
 * @returns {<PageRes<OrderBasis.ResOrderBasisList>>}
 */
export function getOrderBasisList(params: OrderBasis.ReqOrderBasisList) {
  return http.post<PageRes<OrderBasis.ResOrderBasisList>>(
    `/admin/order/basis/list`,
    params,
  )
}

/**
 * @description 新增订单基本信息
 * @param {OrderBasis.ReqAddOrderBasis} params
 * @returns {<PageRes<any>>}
 */
export function addOrderBasis(params: OrderBasis.ReqAddOrderBasis) {
  return http.post<PageRes<any>>(`/admin/order/basis/add`, params)
}

/**
 * @description: 编辑订单基本信息
 * @param {OrderBasis.ReqUpdateOrderBasis} params
 * @returns {<PageRes<any>>}
 */
export function updateOrderBasis(params: OrderBasis.ReqUpdateOrderBasis) {
  return http.put<PageRes<any>>(`/admin/order/basis/modify`, params)
}

/**
 * @description: 删除订单基本信息
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteOrderBasisById(id: string) {
  return http.delete<PageRes<any>>(`/admin/order/basis/remove/${id}`)
}

/**
 * @description: 批量删除订单基本信息
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteOrderBasis(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/order/basis/batchRemove`, ids)
}
