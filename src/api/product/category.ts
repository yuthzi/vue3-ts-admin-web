/*
 * @Author: 朽木白
 * @Date: 2023-03-18 11:19:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-20 22:09:41
 * @Description: 分类接口
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { Category } from './types'

/**
 * 查找一级分类
 */
export function getCategorys1() {
  return http.get<Category.ResCategoryList>('/admin/product/getCategory1')
}

/**
 * 查找二级分类
 */
export function getCategorys2(id: number | undefined) {
  return http.get<Category.ResCategoryList>(`/admin/product/getCategory2/${id}`)
}

/**
 * 查找三级分类
 */
export function getCategorys3(id: number | undefined) {
  return http.get<Category.ResCategoryList>(`/admin/product/getCategory3/${id}`)
}

/**
 * @description 获取分类分页列表(带搜索)
 * @param {Category.ReqCategoryList} params
 * @returns {<PageRes<Category.ResCategoryList>>}
 */
export function getCategoryList(params: Category.ReqCategoryList) {
  return http.post<PageRes<Category.ResCategoryList>>(
    `/admin/category/list`,
    params,
  )
}

/**
 * @description 新增分类
 * @param {Category.ReqAddCategory} params
 * @returns {<PageRes<any>>}
 */
export function addCategory(params: Category.ReqAddCategory) {
  return http.post<PageRes<any>>(`/admin/category/add`, params)
}

/**
 * @description: 编辑分类
 * @param {Category.ReqUpdateCategory} params
 * @returns {<PageRes<any>>}
 */
export function updateCategory(params: Category.ReqUpdateCategory) {
  return http.put<PageRes<any>>(`/admin/category/modify`, params)
}

/**
 * @description: 删除分类
 * @param {string} id
 * @returns {<PageRes<any>>}
 */
export function deleteCategoryById(id: string) {
  return http.delete<PageRes<any>>(`/admin/category/remove/${id}`)
}

/**
 * @description: 批量删除分类
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchDeleteCategory(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/category/batchRemove`, ids)
}
