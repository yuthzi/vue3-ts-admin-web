/*
 * @Author: yuth
 * @Date: 2024-05-28 16:44:14
 * @Description: 客户等级
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { CustomerLevel } from './type'

/**
 * @description 获取客户等级分页列表(带搜索)
 * @param {CustomerLevel.ReqCustomerLevelList} params
 * @returns {<PageRes<CustomerLevel.ResCustomerLevelList>>}
 */
export function getCustomerLevelList(
  params: CustomerLevel.ReqCustomerLevelList,
) {
  return http.post<PageRes<CustomerLevel.ResCustomerLevelList>>(
    `/admin/customer/level/list`,
    params,
  )
}

/**
 * @description 新增客户等级
 * @param {CustomerLevel.ReqAddCustomerLevel} params
 * @returns {<PageRes<any>>}
 */
export function addCustomerLevel(params: CustomerLevel.ReqAddCustomerLevel) {
  return http.post<PageRes<any>>(`/admin/customer/level/add`, params)
}

/**
 * @description: 编辑客户等级
 * @param {CustomerLevel.ReqUpdateCustomerLevel} params
 * @returns {<PageRes<any>>}
 */
export function updateCustomerLevel(
  params: CustomerLevel.ReqUpdateCustomerLevel,
) {
  return http.put<PageRes<any>>(`/admin/customer/level/modify`, params)
}

/**
 * @description: 删除客户等级
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteCustomerLevelById(id: string) {
  return http.delete<PageRes<any>>(`/admin/customer/level/remove/${id}`)
}

/**
 * @description: 批量删除客户等级
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteCustomerLevel(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/customer/level/batchRemove`, ids)
}
