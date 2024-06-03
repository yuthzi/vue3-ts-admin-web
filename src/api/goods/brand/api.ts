/*
 * @Author: yuth
 * @Date: 2024-06-03 09:51:59
 * @Description: 品牌
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { Brand } from './type'

/**
 * @description 获取品牌分页列表(带搜索)
 * @param {Brand.ReqBrandList} params
 * @returns {<PageRes<Brand.ResBrandList>>}
 */
export function getBrandList(params: Brand.ReqBrandList) {
  return http.post<PageRes<Brand.ResBrandList>>(`/admin/brand/list`, params)
}

/**
 * @description 新增品牌
 * @param {Brand.ReqAddBrand} params
 * @returns {<PageRes<any>>}
 */
export function addBrand(params: Brand.ReqAddBrand) {
  return http.post<PageRes<any>>(`/admin/brand/add`, params)
}

/**
 * @description: 编辑品牌
 * @param {Brand.ReqUpdateBrand} params
 * @returns {<PageRes<any>>}
 */
export function updateBrand(params: Brand.ReqUpdateBrand) {
  return http.put<PageRes<any>>(`/admin/brand/modify`, params)
}

/**
 * @description: 删除品牌
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteBrandById(id: string) {
  return http.delete<PageRes<any>>(`/admin/brand/remove/${id}`)
}

/**
 * @description: 批量删除品牌
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteBrand(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/brand/batchRemove`, ids)
}
