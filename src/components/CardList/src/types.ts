/**
 * 卡片区域属性
 */
export type CardAreaProps<T = any> = {
  prop: string // 属性名
  render?: (scope: { row: T }) => any // 自定义单元格内容渲染（tsx语法）
  color?: string
  fontSize?: string
}

export namespace CardList {
  export interface Pageable {
    pageNum: number
    pageSize: number
    total: number
  }

  export interface CardListStateProps {
    cardData: any[]
    pageable: Pageable
    loading: boolean
    searchParam: {
      [key: string]: any
    }
    searchInitParam: {
      [key: string]: any
    }
    totalParam: {
      [key: string]: any
    }
    icon?: {
      [key: string]: any
    }
  }
}
