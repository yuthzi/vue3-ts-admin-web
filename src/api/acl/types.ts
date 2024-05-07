import type { ReqPage } from '../types'

export interface Roles {
  deleted?: boolean
  gmtCreate?: string
  gmtModified?: string
  roleId: string
  remark?: null
  roleName: string
}
// * 用户管理模块
export namespace AclUser {
  export interface ReqAclUserListParams extends ReqPage {
    username?: string
  }
  export interface ReqAclAddUser {
    username: string
    nickname?: string
    password: string
  }
  export interface ReqAssignRoles {
    userId: string
    roleIdList: string
  }
  export interface ResAclUserList {
    deleted: boolean
    gmtCreate: string
    gmtModified: string
    userId: string
    nickname: string
    password: string
    roleName: string
    salt: null
    token: null
    enable: number
    username: string
  }
  export interface ResUserRolesList {
    allRolesList: Roles[]
    assignRoles: Roles[]
  }
}

// * 角色管理模块
export namespace Role {
  export interface ReqRoleListParams extends ReqPage {
    roleName?: string
  }

  export interface ResRoleList {
    deleted?: boolean
    gmtCreate?: string
    gmtModified?: string
    roleId: string
    remark?: any
    roleName: string
  }
}

// * 菜单管理模块
export namespace Permission {
  export interface ReqAssignPermision {
    roleId: string
    permissionId: string
  }

  export interface ReqAddPermission {
    code: string
    level: number
    menuName: string
    pid: string
    toCode: string
    pattern: string
    type: string
  }

  export interface ResPermisionList {
    menuId?: string
    pid?: string // 父级权限菜单的id
    level?: number // 菜单层级
    menuName?: string
    select?: boolean // 菜单是否选中
    children?: ResPermisionList[]
    code?: string // 权限值
    type?: number // 权限类型，type=1为菜单 type=2为按钮
    pattern?: string // URL
  }
}
