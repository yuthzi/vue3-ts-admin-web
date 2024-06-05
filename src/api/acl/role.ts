/*
 * @Description: 角色接口
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { Role } from './types'

/**
 * @description 获取后台用户分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<Role.ResRoleList>>}
 */
export function getRoleList(params: Role.ReqRoleListParams) {
  return http.post<PageRes<Role.ResRoleList>>(`/admin/acl/role/list`, params)
}

/**
 * @description 删除角色
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function deleteRole(id: string) {
  return http.delete<PageRes<any>>(`/admin/acl/role/remove/${id}`)
}

/**
 * @description 添加角色
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function addRole(roleName: object) {
  return http.post<PageRes<any>>(`/admin/acl/role/add`, roleName)
}

/**
 * @description 修改角色
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function updateRole(role: object) {
  return http.put<PageRes<any>>(`/admin/acl/role/modify`, role)
}
