/*
 * 客户等级模型定义
 * @Author: yuth
 * @Date: 2024-05-28 16:44:14
 * @Description: 客户等级
 */
import type { ReqPage } from '@/api/types'

/*
 * 客户等级管理模块
 */
export namespace CustomerLevel {
  export interface ReqAddCustomerLevel {
    tenantId?: string
    levelName?: string
    levelDesc?: string
    minScore?: number
    status?: number | boolean
  }

  export interface ReqUpdateCustomerLevel {
    levelId: string
    tenantId?: string
    levelName?: string
    levelDesc?: string
    minScore?: number
    status?: number | boolean
  }

  export interface ReqCustomerLevelList extends ReqPage {
    levelId?: string
    tenantId?: string
    levelName?: string
    levelDesc?: string
    minScore?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResCustomerLevelList {
    levelId: string
    tenantId?: string
    levelName?: string
    levelDesc?: string
    minScore?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }
}
