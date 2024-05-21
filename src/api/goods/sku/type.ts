
/*
 * SKU模型定义
 * @Author: yuth
 * @Date: 2024-05-21 22:27:32
 * @Description: SKU
 */
import type { ReqPage } from '../types'

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
