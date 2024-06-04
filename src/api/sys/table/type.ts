/*
 * 表信息模型定义
 * @Author: yuth
 * @Date: 2024-06-03 21:11:03
 * @Description: 表信息
 */
import type { ReqPage } from '@/api/types'

/*
 * 表信息管理模块
 */
export namespace SysTable {
  export interface ReqAddSysTable {
    tenantId?: string
    tableName?: string
    entityName?: string
    memo?: string
  }

  export interface ReqUpdateSysTable {
    tableId: string
    tenantId?: string
    tableName?: string
    entityName?: string
    memo?: string
  }

  export interface ReqSysTableList extends ReqPage {
    tableId?: string
    tenantId?: string
    tableName?: string
    entityName?: string
    memo?: string
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResSysTableList {
    tableId: string
    tenantId?: string
    tableName?: string
    entityName?: string
    memo?: string
    gmtCreate?: string
    gmtModified?: string
  }

  /**
   * 代码生成响应
   */
  export interface ResCodeGen {
    name: string
    code: string
    type?: string
  }
}
