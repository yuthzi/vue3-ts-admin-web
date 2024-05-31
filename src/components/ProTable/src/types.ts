import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export namespace Table {
  export interface Pageable {
    pageNum: number
    pageSize: number
    total: number
  }
  export interface TableStateProps {
    tableData: any[]
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

export type TypeProp = 'index' | 'selection' | 'expand'
export type Responsive = {
  span?: number
  offset?: number
}

export interface EnumProps {
  label: string // 选项框显示的文字
  value: any // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

/**
 * 搜索项组件类型。
 * input：element-plus的组件
 * input-number：element-plus的组件
 * select：element-plus的组件
 * select-v2：element-plus的组件
 * tree-select：element-plus的组件
 * cascader：element-plus的组件
 * date-picker：element-plus的组件
 * time-picker：element-plus的组件
 * time-select：element-plus的组件
 * switch：element-plus的组件
 * slider：element-plus的组件
 * BrandSelectorDialog: 自定义组件，品牌选择器
 */
export type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'
  | 'BrandSelectorDialog'

export type SearchProps = {
  el: SearchType // 当前项搜索框的类型。
  isElement?: boolean // 是否是element-plus的组件。默认时true
  props?: any // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  key?: string // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  order?: number // 搜索项排序（从大到小）
  span?: number // 搜索项所占用的列数，默认为1列
  offset?: number // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[] // 搜索项默认值
} & Partial<Record<BreakPoint, Responsive>>

/**
 * @param type element-plus table的属性 + 自定义类型switch。值：'default' | 'selection' | 'index' | 'expand' | switch
 */
export interface ColumnProps<T = any>
  extends Partial<
    Omit<TableColumnCtx<T>, 'children' | 'renderHeader' | 'renderCell'>
  > {
  tag?: boolean // 是否是标签展示
  isShow?: boolean // 是否显示在表格当中
  search?: SearchProps | undefined // 搜索项配置
  enum?: EnumProps[] | ((params?: any) => Promise<any>) // 枚举类型（渲染值的字典）
  isFilterEnum?: boolean // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  fieldNames?: { label: string; value: string } // 指定 label && value 的 key 值
  headerRender?: (row: ColumnProps) => any // 自定义表头内容渲染（tsx语法）
  render?: (scope: { row: T }) => any // 自定义单元格内容渲染（tsx语法）
  beforeChange?: (val: boolean, row: any) => any // type为switch类型时开关的beforeChange事件响应，可选
  onChange?: (evt: any, row: any) => any // type为switch类型时必填。开关的onChange事件响应
  activeValue?: boolean | number | string // type为switch类型时的激活状态值。默认是true
  inactiveValue?: boolean | number | string // type为switch类型时的不激活状态值。默认是false
  _children?: ColumnProps<T>[] // 多级表头
}

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
