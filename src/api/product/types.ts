import type { ReqPage } from '../types'

// export namespace Category {
//   export interface ReqSaveCateGroty {
//     id?: number
//     name: string
//   }
//   export interface ResCategoryList {
//     createTime?: string
//     hasChildren?: boolean
//     id?: number
//     name: string
//     level?: number
//     updateTime: string
//   }
// }

/**
 * 品牌
 */
export namespace Brand {
  /**
   * 编辑
   */
  export interface ReqBrand {
    brandId?: number
    brandName?: string
  }

  export interface ReqBrandList extends ReqPage {
    brandName?: string
  }

  export interface ResBrandList {
    brandId: number
    brandName?: string
    initial: string // 品牌名首字母
    logoUrl: string
    gmtCreate: string
    gmtModified: string
  }
}

interface AttrList {
  attrId: number
  id?: number
  valueName: string
}

export namespace Attr {
  export interface ResAttrList {
    attrName: string
    attrValueList: AttrList[]
    categoryId: number
    categoryLevel: number
    id: number
  }
  export interface ReqAttrData {
    attrName: string
    attrValueList: AttrList[]
    categoryId: number
    categoryLevel: number
    id?: number
  }
}

export namespace Sku {
  export interface ResSkuList {
    category3Id: number
    createTime: string
    id: number
    isSale: number
    price: number
    skuDefaultImg: string
    skuDesc: string
    skuName: string
    spuId: number
    tmId: number
    updateTime: string
    weight: string
  }
}

/*
 * 分类管理模块
 */
export namespace Category {
  export interface ReqAddCategory {
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
  }

  export interface ReqUpdateCategory {
    categoryId: string
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
  }

  export interface ReqCategoryList extends ReqPage {
    categoryId?: string
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }

  export interface ResCategoryList {
    categoryId: string
    tenantId?: string
    pid?: string
    categoryName?: string
    seq?: number
    status?: number | boolean
    gmtCreate?: string
    gmtModified?: string
  }
}
