/*
 * @Author: 朽木白
 * @Date: 2023-03-03 15:58:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-10 16:01:47
 * @Description: 系统账户接口
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { AclUser } from './types'
import { ResultEnum } from '@/enums/httpEnums'

/**
 * @description 获取后台用户分页列表(带搜索)
 * @param page
 * @param limit
 * @param username
 * @returns {<PageRes<AclUser.ResAclUserList>>}
 */
export function getAclUserList(params: AclUser.ReqAclUserListParams) {
  return http
    .post<PageRes<AclUser.ResAclUserList>>(`/admin/acl/user/list`, params)
    .then((rsp) => {
      if (rsp.code == ResultEnum.SUCCESS) {
        const d = rsp.data?.records
        for (let i = 0; i < d.length; i++) {
          const e = d[i]
          e.enable = e.enable == 1 ? true : false
        }
      }

      return rsp
    })
}

/**
 * @description 新增用户
 * @param  {string} username
 * @param {string} nickName
 * @param {string} password
 * @returns {<PageRes<any>>}
 */
export function addAclUser(params: AclUser.ReqAclAddUser) {
  return http.post<PageRes<any>>(`/admin/acl/user/add`, params)
}

/**
 * @description: 编辑用户
 * @param {AclUser} user
 * @returns {<PageRes<any>>}
 */
export function updateAclUser(params: AclUser.ResAclUserList) {
  params.enable = params.enable ? 1 : 0
  return http.put<PageRes<any>>(`/admin/acl/user/modify`, params)
}

/**
 * @description: 删除用户
 * @param {AclUser} user
 * @returns {<PageRes<any>>}
 */
export function deleteAclUserById(id: string) {
  return http.delete<PageRes<any>>(`/admin/acl/user/remove/${id}`)
}

/**
 * @description: 批量删除用户
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchAclUser(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/acl/user/batchRemove`, ids)
}

/**
 * @description:   获取某个用户的所有角色
 * @param {string} userId
 * @returns {<PageRes<any>>}
 */
export function getUserRolesList(userId: string) {
  return http.get<PageRes<AclUser.ResUserRolesList>>(
    `/admin/acl/user/roleList/${userId}`,
  )
}

/**
 * @description:   给某个用户分配角色
 * @param {AclUser.ReqAssignRoles} params
 * @returns {<PageRes<any>>}
 */
export function assignUserRoles(params: AclUser.ReqAssignRoles) {
  return http.post<PageRes<any>>(`/admin/acl/user/doAssignRole`, params)
}
