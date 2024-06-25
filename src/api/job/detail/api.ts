/*
 * @Author: yuth
 * @Date: 2024-06-25 13:36:32
 * @Description: 招聘详情
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { JobDetail } from './type'

/**
 * @description 获取招聘详情分页列表(带搜索)
 * @param {JobDetail.ReqJobDetailList} params
 * @returns {<PageRes<JobDetail.ResJobDetailList>>}
 */
export function getJobDetailList(params: JobDetail.ReqJobDetailList) {
  return http.post<PageRes<JobDetail.ResJobDetailList>>(
    `/admin/job/detail/list`,
    params,
  )
}

/**
 * @description 新增招聘详情
 * @param {JobDetail.ReqAddJobDetail} params
 * @returns {<PageRes<any>>}
 */
export function addJobDetail(params: JobDetail.ReqAddJobDetail) {
  return http.post<PageRes<any>>(`/admin/job/detail/add`, params)
}

/**
 * @description: 编辑招聘详情
 * @param {JobDetail.ReqUpdateJobDetail} params
 * @returns {<PageRes<any>>}
 */
export function updateJobDetail(params: JobDetail.ReqUpdateJobDetail) {
  return http.put<PageRes<any>>(`/admin/job/detail/modify`, params)
}

/**
 * @description: 删除招聘详情
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteJobDetailById(id: string) {
  return http.delete<PageRes<any>>(`/admin/job/detail/remove/${id}`)
}

/**
 * @description: 批量删除招聘详情
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteJobDetail(ids: string[]) {
  return http.delete<any>(`/admin/job/detail/batchRemove`, ids)
}

/**
 * @description:   查询单个
 * @param {string} jobId
 * @returns {<PageRes<any>>}
 */
export function getSingleJobDetail(jobId: string) {
  return http.get<JobDetail.ResJobDetail>(`/admin/job/detail/single/${jobId}`)
}
