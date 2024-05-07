/*
 * @Author: 朽木白
 * @Date: 2023-03-03 15:58:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-10 16:01:47
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
  return http.post<PageRes<LoginLog.ResLoginLogList>>(`/log/login/list`, params)
}
