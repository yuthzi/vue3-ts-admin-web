/*
 * 商品规格模型定义
 * @Author: yuth
 * @Date: 2024-05-21 22:27:31
 * @Description: 商品规格
 */
import type { ReqPage } from '@/api/types'

/*
 * 商品规格管理模块
 */
export namespace GoodsSpec {
  export interface ReqAddGoodsSpec {
    tenantId?: string
    specName?: string
    categoryId?: string
    seq?: string
    values?: GoodsSpecValue.ReqAddGoodsSpecValue[] // 属性值
  }

  export interface ReqUpdateGoodsSpec {
    specId: string
    tenantId?: string
    specName?: string
    categoryId?: string
    seq?: string
    values?: GoodsSpecValue.ReqUpdateGoodsSpecValue[] // 属性值
  }

  export interface ReqGoodsSpecList extends ReqPage {
    specId?: string
    tenantId?: string
    specName?: string
    categoryId?: string
    seq?: string
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResGoodsSpecList {
    specId: string
    tenantId?: string
    specName?: string
    categoryId?: string
    seq?: string
    gmtCreate?: string
    gmtModified?: string
    values?: GoodsSpecValue.ResGoodsSpecValueList[] // 属性值
  }
}

/*
 * 商品规格值管理模块
 */
export namespace GoodsSpecValue {
  export interface ReqAddGoodsSpecValue {
    specVal?: string
  }

  export interface ReqUpdateGoodsSpecValue {
    specValId: string
    specVal?: string
  }

  export interface ResGoodsSpecValueList {
    specValId: string
    tenantId?: string
    specId?: string
    specVal?: string
    seq?: string
    gmtCreate?: string
    gmtModified?: string
  }
}
