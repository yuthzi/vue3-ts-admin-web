/*
 * @Author: yuth
 * @Date: 2024-06-03 10:54:13
 * @Description: 客户
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { Customer } from './type'

/**
 * @description 获取客户分页列表(带搜索)
 * @param {Customer.ReqCustomerList} params
 * @returns {<PageRes<Customer.ResCustomerList>>}
 */
export function getCustomerList(params: Customer.ReqCustomerList) {
  return http.post<PageRes<Customer.ResCustomerList>>(
    `/admin/customer/list`,
    params,
  )
}

/**
 * @description 新增客户
 * @param {Customer.ReqAddCustomer} params
 * @returns {<PageRes<any>>}
 */
export function addCustomer(params: Customer.ReqAddCustomer) {
  return http.post<PageRes<any>>(`/admin/customer/add`, params)
}

/**
 * @description: 编辑客户
 * @param {Customer.ReqUpdateCustomer} params
 * @returns {<PageRes<any>>}
 */
export function updateCustomer(params: Customer.ReqUpdateCustomer) {
  return http.put<PageRes<any>>(`/admin/customer/modify`, params)
}

/**
 * @description: 删除客户
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteCustomerById(id: string) {
  return http.delete<PageRes<any>>(`/admin/customer/remove/${id}`)
}

/**
 * @description: 批量删除客户
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteCustomer(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/customer/batchRemove`, ids)
}
