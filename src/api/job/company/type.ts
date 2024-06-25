/*
 * 招聘公司模型定义
 * @Author: yuth
 * @Date: 2024-06-25 12:04:41
 * @Description: 招聘公司
 */
import type { ReqPage } from '@/api/types'

/*
 * 招聘公司管理模块
 */
export namespace JobCompany {
  export interface ReqAddJobCompany {
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    companyName?: string
    companyTag?: string
    location?: string
    scale?: string
    business?: string
    stage?: string
    introduction?: string
    sourceUrl?: string
    status?: number | boolean
  }

  export interface ReqUpdateJobCompany {
    companyId: string
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    companyName?: string
    companyTag?: string
    location?: string
    scale?: string
    business?: string
    stage?: string
    introduction?: string
    sourceUrl?: string
    status?: number | boolean
  }

  export interface ReqJobCompanyList extends ReqPage {
    companyId?: string
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    companyName?: string
    companyTag?: string
    location?: string
    scale?: string
    business?: string
    stage?: string
    introduction?: string
    sourceUrl?: string
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResJobCompanyList {
    companyId: string
    tenantId?: string
    platformId?: string
    signLow?: string
    signHight?: string
    companyName?: string
    companyTag?: string
    location?: string
    scale?: string
    business?: string
    stage?: string
    introduction?: string
    sourceUrl?: string
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }
}
