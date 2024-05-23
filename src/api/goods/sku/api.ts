/*
 * @Author: yuth
 * @Date: 2024-05-21 22:27:32
 * @Description: SKU
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { GoodsSku } from './type'

/**
 * @description 获取SKU分页列表(带搜索)
 * @param {GoodsSku.ReqGoodsSkuList} params
 * @returns {<PageRes<GoodsSku.ResGoodsSkuList>>}
 */
export function getGoodsSkuList(params: GoodsSku.ReqGoodsSkuList) {
  return http.post<PageRes<GoodsSku.ResGoodsSkuList>>(
    `/admin/goods/sku/list`,
    params,
  )
}

/**
 * @description 新增SKU
 * @param {GoodsSku.ReqAddGoodsSku} params
 * @returns {<PageRes<any>>}
 */
export function addGoodsSku(params: GoodsSku.ReqAddGoodsSku) {
  return http.post<PageRes<any>>(`/admin/goods/sku/add`, params)
}

/**
 * @description: 编辑SKU
 * @param {GoodsSku.ReqUpdateGoodsSku} params
 * @returns {<PageRes<any>>}
 */
export function updateGoodsSku(params: GoodsSku.ReqUpdateGoodsSku) {
  return http.put<PageRes<any>>(`/admin/goods/sku/modify`, params)
}

/**
 * @description: 删除SKU
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteGoodsSkuById(id: string) {
  return http.delete<PageRes<any>>(`/admin/goods/sku/remove/${id}`)
}

/**
 * @description: 批量删除SKU
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteGoodsSku(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/goods/sku/batchRemove`, ids)
}
