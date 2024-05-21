
/*
 * @Author: yuth
 * @Date: 2024-05-21 22:27:32
 * @Description: 商品规格值
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { GoodsSpecValue } from './type'

/**
 * @description 获取商品规格值分页列表(带搜索)
 * @param {GoodsSpecValue.ReqGoodsSpecValueList} params
 * @returns {<PageRes<GoodsSpecValue.ResGoodsSpecValueList>>}
 */
export function getGoodsSpecValueList(params: GoodsSpecValue.ReqGoodsSpecValueList) {
  return http.post<PageRes<GoodsSpecValue.ResGoodsSpecValueList>>(
    `/admin/goods/spec/value/list`,
    params,
  )
}

/**
 * @description 新增商品规格值
 * @param {GoodsSpecValue.ReqAddGoodsSpecValue} params
 * @returns {<PageRes<any>>}
 */
export function addGoodsSpecValue(params: GoodsSpecValue.ReqAddGoodsSpecValue) {
  return http.post<PageRes<any>>(`/admin/goods/spec/value/add`, params)
}

/**
 * @description: 编辑商品规格值
 * @param {GoodsSpecValue.ReqUpdateGoodsSpecValue} params
 * @returns {<PageRes<any>>}
 */
export function updateGoodsSpecValue(params: GoodsSpecValue.ReqUpdateGoodsSpecValue) {
  return http.put<PageRes<any>>(`/admin/goods/spec/value/modify`, params)
}

/**
 * @description: 删除商品规格值
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteGoodsSpecValueById(id: string) {
  return http.delete<PageRes<any>>(`/admin/goods/spec/value/remove/${id}`)
}

/**
 * @description: 批量删除商品规格值
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteGoodsSpecValue(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/goods/spec/value/batchRemove`, ids)
}
