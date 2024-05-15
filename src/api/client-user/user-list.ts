/*
 * @Description: 会员管理
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import { ClientUser } from './types'

/**
 * @description:  获取客户列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getClientUserList(params: ClientUser.ReqClientUserList) {
  return http.post<PageRes<ClientUser.ResClientUserList>>(
    `/admin/customer/list`,
    params,
  )
}

/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function lockClientUser(params: { customerId: string; status: number }) {
  return http.put<PageRes<any>>(
    `/admin/customer/lock/${params.customerId}/${params.status}`,
  )
}
