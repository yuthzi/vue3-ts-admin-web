/*
 * 客户模型定义
 * @Author: yuth
 * @Date: 2024-06-03 11:06:47
 * @Description: 客户
 */
import type { ReqPage } from '@/api/types'

/*
 * 客户管理模块
 */
export namespace Customer {
  export interface ReqAddCustomer {
    tenantId?: string
    username?: string
    nickname?: string
    gender?: number
    levelScore?: number
    levelName?: string
    password?: string
    phone?: string
    avatar?: string
    status?: number | boolean
  }

  export interface ReqUpdateCustomer {
    customerId: string
    tenantId?: string
    username?: string
    nickname?: string
    gender?: number
    levelScore?: number
    levelName?: string
    password?: string
    phone?: string
    avatar?: string
    status?: number | boolean
  }

  export interface ReqCustomerList extends ReqPage {
    customerId?: string
    tenantId?: string
    username?: string
    nickname?: string
    gender?: number
    levelScore?: number
    levelName?: string
    password?: string
    phone?: string
    avatar?: string
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResCustomerList {
    customerId: string
    tenantId?: string
    username?: string
    nickname?: string
    gender?: number
    levelScore?: number
    levelName?: string
    password?: string
    phone?: string
    avatar?: string
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }
}
