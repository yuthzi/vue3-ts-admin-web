/*
 * 品牌模型定义
 * @Author: yuth
 * @Date: 2024-06-03 09:51:59
 * @Description: 品牌
 */
import type { ReqPage } from '@/api/types'

/*
 * 品牌管理模块
 */
export namespace Brand {
  export interface ReqAddBrand {
    tenantId?: string
    brandName?: string
    initial?: string
    logoUrl?: string
    seq?: number
    status?: number | boolean
  }

  export interface ReqUpdateBrand {
    brandId: string
    tenantId?: string
    brandName?: string
    initial?: string
    logoUrl?: string
    seq?: number
    status?: number | boolean
  }

  export interface ReqBrandList extends ReqPage {
    brandId?: string
    tenantId?: string
    brandName?: string
    initial?: string
    logoUrl?: string
    seq?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResBrandList {
    brandId: string
    tenantId?: string
    brandName?: string
    initial?: string
    logoUrl?: string
    seq?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }
}
