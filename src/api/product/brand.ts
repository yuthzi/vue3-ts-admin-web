/*
 * @Description: 品牌接口
 */
import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import type { Brand } from './types'

/**
 * @description:  获取品牌列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getBrandList(params: Brand.ReqBrandList) {
  return http.post<Brand.ResBrandList>(`/admin/brand/list`, params)
}

/**
 * @description: 根据id删除品牌
 * @param {number} id
 * @returns {*}
 */
export function removeBrand(id: number) {
  return http.delete<PageRes<any>>(`/admin/brand/remove/${id}`)
}

/**
 * @description: 新增品牌
 * @param {Brand} data
 * @returns {*}
 */
export function addBrand(data: Brand.ReqBrand) {
  return http.post<PageRes<any>>(`/admin/brand/add`, data)
}

/**
 * @description: 修改品牌
 * @param {Brand} data
 * @returns {*}
 */
export function updateBrand(data: Brand.ReqBrand) {
  return http.post<PageRes<any>>(`/admin/brand/modify`, data)
}
