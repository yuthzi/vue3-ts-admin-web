/*
 * 分类模型定义
 * @Author: yuth
 * @Date: 2024-06-03 10:47:25
 * @Description: 分类
 */
import type { ReqPage } from '@/api/types'

/*
 * 分类管理模块
 */
export namespace Category {
  export interface ReqAddCategory {
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
  }

  export interface ReqUpdateCategory {
    categoryId: string
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
  }

  export interface ReqCategoryList extends ReqPage {
    categoryId?: string
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResCategoryList {
    categoryId: string
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
    children?: ReqCategoryList[]
  }
}
