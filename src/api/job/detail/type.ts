/*
 * 招聘详情模型定义
 * @Author: yuth
 * @Date: 2024-06-25 13:36:32
 * @Description: 招聘详情
 */
import type { ReqPage } from '@/api/types'

/*
 * 招聘详情管理模块
 */
export namespace JobDetail {
  export interface ReqAddJobDetail {
    tenantId?: string
    companyId?: string
    title?: string
    welfare?: string
    location?: string
    category?: string
    keyword?: string
    detail?: string
  }

  export interface ReqUpdateJobDetail {
    jobId: string
    tenantId?: string
    companyId?: string
    title?: string
    welfare?: string
    location?: string
    category?: string
    keyword?: string
    detail?: string
  }

  export interface ReqJobDetailList extends ReqPage {
    jobId?: string
    tenantId?: string
    companyId?: string
    title?: string
    welfare?: string
    location?: string
    category?: string
    keyword?: string
    detail?: string
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResJobDetailList {
    jobId: string
    tenantId?: string
    companyId?: string
    title?: string
    welfare?: string
    location?: string
    category?: string
    keyword?: string
    detail?: string
    gmtCreate?: string
    gmtModified?: string
  }
}
