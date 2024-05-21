
/*
 * 商品规格值模型定义
 * @Author: yuth
 * @Date: 2024-05-21 22:27:32
 * @Description: 商品规格值
 */
import type { ReqPage } from '../types'

/*
 * 商品规格值管理模块
 */
export namespace GoodsSpecValue {
  export interface ReqAddGoodsSpecValue {
    tenantId?: string
    specId?: string
    specVal?: string
    seq?: string
          }

  export interface ReqUpdateGoodsSpecValue {
    specValId: string
    tenantId?: string
    specId?: string
    specVal?: string
    seq?: string
          }

  export interface ReqGoodsSpecValueList extends ReqPage {
    specValId?: string
    tenantId?: string
    specId?: string
    specVal?: string
    seq?: string
    gmtCreate?: string
    gmtModified?: string
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
