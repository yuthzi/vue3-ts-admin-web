/*
 * @Author: yuth
 * @Date: 2024-05-21 22:27:32
 * @Description: 商品规格
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { GoodsSpec } from './type'

/**
 * @description 获取商品规格分页列表(带搜索)
 * @param {GoodsSpec.ReqGoodsSpecList} params
 * @returns {<PageRes<GoodsSpec.ResGoodsSpecList>>}
 */
export function getGoodsSpecList(params: GoodsSpec.ReqGoodsSpecList) {
  // 处理分类选择器返回的数据是一个路径的问题
  if (params.categoryId && Array.isArray(params.categoryId)) {
    params.categoryId = params.categoryId.pop()
  }

  return http.post<PageRes<GoodsSpec.ResGoodsSpecList>>(
    `/admin/goods/spec/list`,
    params,
  )
}

/**
 * @description 新增商品规格
 * @param {GoodsSpec.ReqAddGoodsSpec} params
 * @returns {<PageRes<any>>}
 */
export function addGoodsSpec(params: GoodsSpec.ReqAddGoodsSpec) {
  return http.post<PageRes<any>>(`/admin/goods/spec/add`, params)
}

/**
 * @description: 编辑商品规格
 * @param {GoodsSpec.ReqUpdateGoodsSpec} params
 * @returns {<PageRes<any>>}
 */
export function updateGoodsSpec(params: GoodsSpec.ReqUpdateGoodsSpec) {
  return http.put<PageRes<any>>(`/admin/goods/spec/modify`, params)
}

/**
 * @description: 删除商品规格
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteGoodsSpecById(id: string) {
  return http.delete<PageRes<any>>(`/admin/goods/spec/remove/${id}`)
}

/**
 * @description: 批量删除商品规格
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteGoodsSpec(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/goods/spec/batchRemove`, ids)
}
