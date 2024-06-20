/*
 * @Author: yuth
 * @Date: 2024-06-20 17:57:31
 * @Description: 招聘平台
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { JobPlatform } from './type'

/**
 * @description 获取招聘平台分页列表(带搜索)
 * @param {JobPlatform.ReqJobPlatformList} params
 * @returns {<PageRes<JobPlatform.ResJobPlatformList>>}
 */
export function getJobPlatformList(params: JobPlatform.ReqJobPlatformList) {
  return http.post<PageRes<JobPlatform.ResJobPlatformList>>(
    `/admin/job/platform/list`,
    params,
  )
}

/**
 * @description 新增招聘平台
 * @param {JobPlatform.ReqAddJobPlatform} params
 * @returns {<PageRes<any>>}
 */
export function addJobPlatform(params: JobPlatform.ReqAddJobPlatform) {
  return http.post<PageRes<any>>(`/admin/job/platform/add`, params)
}

/**
 * @description: 编辑招聘平台
 * @param {JobPlatform.ReqUpdateJobPlatform} params
 * @returns {<PageRes<any>>}
 */
export function updateJobPlatform(params: JobPlatform.ReqUpdateJobPlatform) {
  return http.put<PageRes<any>>(`/admin/job/platform/modify`, params)
}

/**
 * @description: 删除招聘平台
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteJobPlatformById(id: string) {
  return http.delete<PageRes<any>>(`/admin/job/platform/remove/${id}`)
}

/**
 * @description: 批量删除招聘平台
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteJobPlatform(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/job/platform/batchRemove`, ids)
}
