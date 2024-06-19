/*
 * 招聘模型定义
 * @Author: yuth
 * @Date: 2024-06-19 21:03:29
 * @Description: 招聘
 */
import type { ReqPage } from '@/api/types'

/*
 * 招聘管理模块
 */
export namespace Job {
  export interface ReqAddJob {
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    title?: string
    jobyear?: string
    jobdegree?: string
    tag?: string
    salary?: string
    companyName?: string
    companyUrl?: string
    location?: string
    detail?: string
    sourceUrl?: string
    status?: number | boolean
    publishTime?: string
  }

  export interface ReqUpdateJob {
    jobId: string
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    title?: string
    jobyear?: string
    jobdegree?: string
    tag?: string
    salary?: string
    companyName?: string
    companyUrl?: string
    location?: string
    detail?: string
    sourceUrl?: string
    status?: number | boolean
    publishTime?: string
  }

  export interface ReqJobList extends ReqPage {
    jobId?: string
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    title?: string
    jobyear?: string
    jobdegree?: string
    tag?: string
    salary?: string
    companyName?: string
    companyUrl?: string
    location?: string
    detail?: string
    sourceUrl?: string
    status?: number | boolean
    publishTime?: string
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResJobList {
    jobId: string
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    title?: string
    jobyear?: string
    jobdegree?: string
    tag?: string
    salary?: string
    companyName?: string
    companyUrl?: string
    location?: string
    detail?: string
    sourceUrl?: string
    status?: number | boolean
    publishTime?: string
    gmtCreate?: string
    gmtModified?: string
  }
}
