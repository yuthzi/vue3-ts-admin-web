/*
 * @Author: yuth
 * @Date: 2024-06-03 11:17:03
 * @Description: SPU
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { GoodsSpu } from './type'

/**
 * @description 获取SPU分页列表(带搜索)
 * @param {GoodsSpu.ReqGoodsSpuList} params
 * @returns {<PageRes<GoodsSpu.ResGoodsSpuList>>}
 */
export function getGoodsSpuList(params: GoodsSpu.ReqGoodsSpuList) {
  return http.post<PageRes<GoodsSpu.ResGoodsSpuList>>(
    `/admin/goods/spu/list`,
    params,
  )
}

/**
 * @description 新增SPU
 * @param {GoodsSpu.ReqAddGoodsSpu} params
 * @returns {<PageRes<any>>}
 */
export function addGoodsSpu(params: GoodsSpu.ReqAddGoodsSpu) {
  return http.post<PageRes<any>>(`/admin/goods/spu/add`, params)
}

/**
 * @description: 编辑SPU
 * @param {GoodsSpu.ReqUpdateGoodsSpu} params
 * @returns {<PageRes<any>>}
 */
export function updateGoodsSpu(params: GoodsSpu.ReqUpdateGoodsSpu) {
  return http.put<PageRes<any>>(`/admin/goods/spu/modify`, params)
}

/**
 * @description: 删除SPU
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteGoodsSpuById(id: string) {
  return http.delete<PageRes<any>>(`/admin/goods/spu/remove/${id}`)
}

/**
 * @description: 批量删除SPU
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteGoodsSpu(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/goods/spu/batchRemove`, ids)
}
