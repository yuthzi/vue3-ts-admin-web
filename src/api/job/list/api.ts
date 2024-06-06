/*
 * @Author: yuth
 * @Date: 2024-06-18 16:31:27
 * @Description: 招聘
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { Job } from './type'

/**
 * @description 获取招聘分页列表(带搜索)
 * @param {Job.ReqJobList} params
 * @returns {<PageRes<Job.ResJobList>>}
 */
export function getJobList(params: Job.ReqJobList) {
  return http.post<PageRes<Job.ResJobList>>(`/admin/job/list`, params)
}

/**
 * @description 新增招聘
 * @param {Job.ReqAddJob} params
 * @returns {<PageRes<any>>}
 */
export function addJob(params: Job.ReqAddJob) {
  return http.post<PageRes<any>>(`/admin/job/add`, params)
}

/**
 * @description: 编辑招聘
 * @param {Job.ReqUpdateJob} params
 * @returns {<PageRes<any>>}
 */
export function updateJob(params: Job.ReqUpdateJob) {
  return http.put<PageRes<any>>(`/admin/job/modify`, params)
}

/**
 * @description: 删除招聘
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteJobById(id: string) {
  return http.delete<PageRes<any>>(`/admin/job/remove/${id}`)
}

/**
 * @description: 批量删除招聘
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteJob(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/job/batchRemove`, ids)
}
