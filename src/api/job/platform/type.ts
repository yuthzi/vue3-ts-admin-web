/*
 * 招聘平台模型定义
 * @Author: yuth
 * @Date: 2024-06-20 17:57:31
 * @Description: 招聘平台
 */
import type { ReqPage } from '@/api/types'

/*
 * 招聘平台管理模块
 */
export namespace JobPlatform {
  export interface ReqAddJobPlatform {
    tenantId?: string
    name?: string
    memo?: string
    url?: string
    status?: number | boolean
  }

  export interface ReqUpdateJobPlatform {
    platformId: string
    tenantId?: string
    name?: string
    memo?: string
    url?: string
    status?: number | boolean
  }

  export interface ReqJobPlatformList extends ReqPage {
    platformId?: string
    tenantId?: string
    name?: string
    memo?: string
    url?: string
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResJobPlatformList {
    platformId: string
    tenantId?: string
    name?: string
    memo?: string
    url?: string
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }
}
