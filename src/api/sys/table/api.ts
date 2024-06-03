/*
 * @Author: yuth
 * @Date: 2024-06-03 21:11:03
 * @Description: 表信息
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { SysTable } from './type'

/**
 * @description 获取表信息分页列表(带搜索)
 * @param {SysTable.ReqSysTableList} params
 * @returns {<PageRes<SysTable.ResSysTableList>>}
 */
export function getSysTableList(params: SysTable.ReqSysTableList) {
  return http.post<PageRes<SysTable.ResSysTableList>>(
    `/admin/sys/table/list`,
    params,
  )
}

/**
 * @description 新增表信息
 * @param {SysTable.ReqAddSysTable} params
 * @returns {<PageRes<any>>}
 */
export function addSysTable(params: SysTable.ReqAddSysTable) {
  return http.post<PageRes<any>>(`/admin/sys/table/add`, params)
}

/**
 * @description: 编辑表信息
 * @param {SysTable.ReqUpdateSysTable} params
 * @returns {<PageRes<any>>}
 */
export function updateSysTable(params: SysTable.ReqUpdateSysTable) {
  return http.put<PageRes<any>>(`/admin/sys/table/modify`, params)
}

/**
 * @description: 删除表信息
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteSysTableById(id: string) {
  return http.delete<PageRes<any>>(`/admin/sys/table/remove/${id}`)
}

/**
 * @description: 批量删除表信息
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteSysTable(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/sys/table/batchRemove`, ids)
}

/**
 * @description: 同步表信息
 * @returns {<PageRes<any>>}
 */
export function syncTable() {
  return http.post<PageRes<any>>(`/admin/sys/table/sync`)
}
