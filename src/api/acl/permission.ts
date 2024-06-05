/*
 * @Description: 权限接口
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { Permission } from './types'

/**
 * @description 查看某个角色权限列表
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function getRolePermission(roleId: string | number) {
  return http.get<PageRes<Permission.ResPermisionList[]>>(
    `/admin/acl/permission/getRolePermission/${roleId}`,
  )
}

/**
 * @description 给某个角色分配权限
 * @param { Permission.ReqAssignPermision } data
 * @returns {<PageRes<any>>}
 */
export function assignRolePermission(params: Permission.ReqAssignPermision) {
  return http.post<PageRes<any>>(`/admin/acl/permission/assign`, params)
}

/**
 * @description 获取权限菜单列表
 * @returns
 */
export function getPermissionList() {
  return http.get<PageRes<Permission.ResPermisionList[]>>(
    `admin/acl/permission/list`,
  )
}

/**
 * @description 删除权限
 * @param { string } id
 * @returns
 */
export function deletePermission(id: string) {
  return http.delete<PageRes<any>>(`admin/acl/permission/remove/${id}`)
}

/**
 * @description 新增权限
 * @param { string } id
 * @returns
 */
export function addPermission(data: Permission.ResPermisionList) {
  return http.post<PageRes<any>>(`admin/acl/permission/add`, data)
}

/**
 * @description 修改权限
 * @param { string } menuId
 * @returns
 */
export function updatePermission(data: Permission.ResPermisionList) {
  return http.put<PageRes<any>>(`admin/acl/permission/modify`, data)
}

/**
 * @description 修改权限
 * @param { string } menuId
 * @returns
 */
export function shiftSeq(data: Permission.ReqShiftSeq) {
  return http.put<PageRes<any>>(`admin/acl/permission/shiftSeq`, data)
}
