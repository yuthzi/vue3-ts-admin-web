/*
 * @Author: yuth
 * @Date: 2024-06-03 10:47:25
 * @Description: 分类
 */
import http from '@/utils/http'
import type { PageRes } from '@/api/types'
import type { Category } from './type'

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
 * @description 获取分类选择器数据(带搜索)
 * @param {Category.ReqCategoryList} params
 * @returns {<PageRes<Category.ResCategoryList>>}
 */
export function getCategorySelector(params: Category.ReqCategoryList) {
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
