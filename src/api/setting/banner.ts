/*
 * @Description: banner管理
 */
import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { Banner } from './types'
/**
 * @description:  获取banner列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getBannerList(params: ReqPage) {
  return http.get<PageRes<Banner.ResBannerList>>(
    `/admin/cms/banner/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 添加banner
 * @param {Banner.ReqBannerData} data
 * @returns {*}
 */
export function saveBanner(data: Banner.ReqBannerData) {
  return http.post<PageRes<any>>(`/admin/cms/banner/save`, data)
}

/**
 * @description: 修改banner
 * @param {Banner.ReqBannerData} data
 * @returns {*}
 */
export function updateBanner(data: Banner.ReqBannerData) {
  return http.put<PageRes<any>>(`/admin/cms/banner/modify`, data)
}

/**
 * @description:  删除banner
 * @param {ReqPage} params
 * @returns {*}
 */
export function removeBanner(id: number) {
  return http.delete<PageRes<any>>(`/admin/cms/banner/remove/${id}`)
}
