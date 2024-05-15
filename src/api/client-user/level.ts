/*
 * @Description: 客户等级
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import { ClientUser } from './types'
import { ResultEnum } from '@/enums/httpEnums'

/**
 * @description:  获取等级列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getCustomerLevelList(params: ClientUser.ReqLevelList) {
  return http
    .post<PageRes<ClientUser.ResLevelList>>(
      `/admin/customer/level/list`,
      params,
    )
    .then((rsp) => {
      if (rsp.code == ResultEnum.SUCCESS) {
        const d = rsp.data?.records
        for (let i = 0; i < d.length; i++) {
          const e = d[i]
          e.status = e.status == 1 ? true : false
        }
      }

      return rsp
    })
}

/**
 * @description 新增客户等级
 * @param
 * @returns {<PageRes<any>>}
 */
export function addCustomerLevel(params: ClientUser.ReqAddLevel) {
  return http.post<PageRes<any>>(`/admin/customer/level/add`, params)
}

/**
 * @description: 编辑客户等级
 * @param {ClientUser} user
 * @returns {<PageRes<any>>}
 */
export function updateCustomerLevel(params: ClientUser.ResLevelList) {
  params.status = params.status ? 1 : 0
  return http.put<PageRes<any>>(`/admin/customer/level/modify`, params)
}

/**
 * @description: 删除客户等级
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteCustomerLevelById(id: string) {
  return http.delete<PageRes<any>>(`/admin/customer/level/${id}`)
}
