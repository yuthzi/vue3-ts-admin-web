/*
 * SKU模型定义
 * @Author: yuth
 * @Date: 2024-06-03 11:12:50
 * @Description: SKU
 */
import type { ReqPage } from '@/api/types'

/*
 * SKU管理模块
 */
export namespace GoodsSku {
  export interface ReqAddGoodsSku {
    tenantId?: string
    spuId?: string
    spec?: string
    unit?: string
    sellingPrice?: string
    quantity?: string
    lockQuantity?: string
    version?: string
  }

  export interface ReqUpdateGoodsSku {
    skuId: string
    tenantId?: string
    spuId?: string
    spec?: string
    unit?: string
    sellingPrice?: string
    quantity?: string
    lockQuantity?: string
    version?: string
  }

  export interface ReqGoodsSkuList extends ReqPage {
    skuId?: string
    tenantId?: string
    spuId?: string
    spec?: string
    unit?: string
    sellingPrice?: string
    quantity?: string
    lockQuantity?: string
    version?: string
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResGoodsSkuList {
    skuId: string
    tenantId?: string
    spuId?: string
    spec?: string
    unit?: string
    sellingPrice?: string
    quantity?: string
    lockQuantity?: string
    version?: string
    gmtCreate?: string
    gmtModified?: string
  }
}
