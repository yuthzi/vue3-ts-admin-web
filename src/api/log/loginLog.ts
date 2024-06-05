/*
 * @Description: 系统账户接口
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { LoginLog } from './types'

/**
 * @description 获取用户登录日志分页列表(带搜索)
 * @param page
 * @param limit
 * @param username
 * @returns {<PageRes<AclUser.ResAclUserList>>}
 */
export function getLoginLogList(params: LoginLog.ReqLoginLogListParams) {
  return http.post<PageRes<LoginLog.ResLoginLogList>>(
    `/admin/log/login/list`,
    params,
  )
}
