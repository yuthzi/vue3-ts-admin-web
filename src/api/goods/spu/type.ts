/*
 * SPU模型定义
 * @Author: yuth
 * @Date: 2024-05-21 22:27:32
 * @Description: SPU
 */
import type { ReqPage } from '@/api/types'

/*
 * SPU管理模块
 */
export namespace GoodsSpu {
  export interface ReqAddGoodsSpu {
    tenantId?: string
    goodsName?: string
    goodsTitle?: string
    categoryId?: string
    brandId?: string
    brandName?: string
    mneCode?: string
    artNo?: string
    specId?: string
    unit?: string
    sellingPrice?: string
    intro?: string
    picUrl?: string
    isAudited?: string
    seq?: number
  }

  export interface ReqUpdateGoodsSpu {
    spuId: string
    tenantId?: string
    goodsName?: string
    goodsTitle?: string
    categoryId?: string
    brandId?: string
    brandName?: string
    mneCode?: string
    artNo?: string
    specId?: string
    unit?: string
    sellingPrice?: string
    intro?: string
    picUrl?: string
    isAudited?: string
    seq?: number
  }

  export interface ReqGoodsSpuList extends ReqPage {
    spuId?: string
    tenantId?: string
    goodsName?: string
    goodsTitle?: string
    categoryId?: string
    brandId?: string
    brandName?: string
    mneCode?: string
    artNo?: string
    specId?: string
    unit?: string
    sellingPrice?: string
    intro?: string
    picUrl?: string
    isAudited?: string
    seq?: number
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResGoodsSpuList {
    spuId: string
    tenantId?: string
    goodsName?: string
    goodsTitle?: string
    categoryId?: string
    brandId?: string
    brandName?: string
    mneCode?: string
    artNo?: string
    specId?: string
    unit?: string
    sellingPrice?: string
    intro?: string
    picUrl?: string
    isAudited?: string
    seq?: number
    gmtCreate?: string
    gmtModified?: string
  }
}
