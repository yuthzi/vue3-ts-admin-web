import type { ReqPage } from '../types'

// * 登录日志管理模块
export namespace LoginLog {
  export interface ReqLoginLogListParams extends ReqPage {
    userId?: string
    username?: string
  }

  export interface ResLoginLogList {
    logId: string
    userId: string
    username: string
    ip: string
    location: string
    browser: string
    os: string
    status: number
    msg: string
    gmtCreate: string
    gmtModified: string
  }
}
