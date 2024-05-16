/**
 * 客户相关模型定义
 */
export namespace ClientUser {
  export interface ReqClientUserList {
    username: string
    nickname: string
    gender: string
    levelName: string
  }

  export interface ReqLevelList {
    levelName: string
  }

  export interface ResClientUserList {
    customerId: string
    username: string
    nickname: string
    gender: string
    levelScore: number
    levelName: string
    password: string
    phone: string
    avatar: string
    status: number
    gmtCreate: string
    gmtModified: string
  }

  /**
   * 客户等级列表响应
   */
  export interface ResLevelList {
    levelId: string //等级ID（主键）
    levelName: string //等级名称
    levelDesc: string //等级描述
    minScore: number //所需最小积分
    status: number | boolean //状态。0禁用；1启用
    gmtCreate: string // 创建时间
    gmtModified: string //更新时间
  }

  export interface ReqAddLevel {
    levelName: string //等级名称
    levelDesc: string //等级描述
    minScore: number //所需最小积分
    status: number //状态。0禁用；1启用
  }
}
