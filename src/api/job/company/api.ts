/*
 * @Author: yuth
 * @Date: 2024-06-25 12:04:41
 * @Description: 招聘公司
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { JobCompany } from './type'

/**
 * @description 获取招聘公司分页列表(带搜索)
 * @param {JobCompany.ReqJobCompanyList} params
 * @returns {<PageRes<JobCompany.ResJobCompanyList>>}
 */
export function getJobCompanyList(params: JobCompany.ReqJobCompanyList) {
  return http.post<PageRes<JobCompany.ResJobCompanyList>>(
    `/admin/job/company/list`,
    params,
  )
}

/**
 * @description 新增招聘公司
 * @param {JobCompany.ReqAddJobCompany} params
 * @returns {<PageRes<any>>}
 */
export function addJobCompany(params: JobCompany.ReqAddJobCompany) {
  return http.post<PageRes<any>>(`/admin/job/company/add`, params)
}

/**
 * @description: 编辑招聘公司
 * @param {JobCompany.ReqUpdateJobCompany} params
 * @returns {<PageRes<any>>}
 */
export function updateJobCompany(params: JobCompany.ReqUpdateJobCompany) {
  return http.put<PageRes<any>>(`/admin/job/company/modify`, params)
}

/**
 * @description: 删除招聘公司
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteJobCompanyById(id: string) {
  return http.delete<PageRes<any>>(`/admin/job/company/remove/${id}`)
}

/**
 * @description: 批量删除招聘公司
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteJobCompany(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/job/company/batchRemove`, ids)
}
