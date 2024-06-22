<template>
  <SearchForm
    v-if="isShowSearch"
    :columns="searchColumns"
    :searchParam="searchParam"
    :searchCol="searchCol"
    :search="search"
    :reset="reset"
    :onCollapse="onCollapse"
  />
  <div class="card table" ref="tableCard">
    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
      <div class="header-left" v-if="bodyViewType == ListViewEnum.TABLE">
        <slot
          name="tableHeader"
          :selectedListIds="selectedListIds"
          :selectedList="selectedList"
          :isSelected="isSelected"
        ></slot>
      </div>
      <div class="header-right" v-if="toolButton">
        <el-tooltip content="刷新表格">
          <el-icon size="18" @click="getTableList">
            <Refresh />
          </el-icon>
        </el-tooltip>
        <el-tooltip
          v-if="false"
          :content="!isFullscreen ? '全屏' : '收起'"
          placement="bottom"
        >
          <SvgIcon
            size="18"
            name="full-screen"
            v-if="!isFullscreen"
            @click="toggle"
          />
          <SvgIcon size="18" name="exit-full" v-else @click="toggle" />
        </el-tooltip>
        <el-tooltip content="列设置">
          <el-icon size="18" v-if="columns.length" @click="openColSetting">
            <Setting />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="卡片视图">
          <el-icon size="18" @click="handleOpenCardList">
            <Postcard />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <!-- 表格主体。表格视图 -->
    <TableBody
      v-if="bodyViewType == ListViewEnum.TABLE"
      ref="tableBody"
      v-bind="$attrs"
      :tableData="tableData"
      :columns="columns"
      :selectId="selectId"
      :highlightCurrentRow="highlightCurrentRow"
      :border="border"
      :loading="loading"
    >
      <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
        <slot :name="slot" :row="scope.row"></slot>
      </template>
    </TableBody>
    <!-- 表格主体。卡片视图 -->
    <CardList
      v-if="bodyViewType == ListViewEnum.CARD"
      ref="tableBody"
      :width="'600px'"
      :data="tableData"
      :leftTop="leftTop"
      :rightTop="rightTop"
      :center="center"
      :leftBottom="leftBottom"
      :rightBottom="rightBottom"
    ></CardList>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      />
    </slot>
  </div>
  <ColSetting v-if="toolButton" ref="colRef" v-model:colSetting="colSetting" />
</template>

<script lang="tsx" setup name="ProTable">
import { computed, onMounted, ref, provide, watch } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useTable } from './hooks/useTable'
import { TableProps } from 'element-plus'
import type { ColumnProps, BreakPoint } from './types'
import SearchForm from '@/components/SearchForm'
import Pagination from './components/Pagination.vue'
import ColSetting from './components/ColSetting.vue'
import TableBody from './components/TableBody.vue'
import CardList from './components/CardList.vue'

/**
 * @description: props类型定义
 * @param columns       - 列配置项
 * @param requestApi    - 请求表格数据的api ==> 必传
 * @param dataCallback  - 返回数据的回调函数，可以对数据进行处理 ==> 非必传
 * @param title         - 表格标题，目前只在打印的时候用到 ==> 非必传
 * @param pagination    - 是否需要分页组件 ==> 非必传（默认为true）
 * @param pageSize      - 每页数目 ==> 非必传（默认为10）
 * @param initParam     - 初始化请求参数 ==> 非必传（默认为{}）
 * @param border        - 是否带有纵向边框 ==> 非必传（默认为true）
 * @param toolButton    - 是否显示表格功能按钮 ==> 非必传（默认为true）
 * @param selectId      - 当表格数据多选时，所指定的字段名 ==> 非必传（默认为 id）
 * @param searchCol     - 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
 * @param isShowSearch  - 是否展示搜索           ==> 非必传 （默认为true）
 * @param onCollapse    - 是否展示搜索框展开/折叠的事件响应  ==> 非必传
 * @param highlightCurrentRow    - 是否高亮选中行  ==> 非必传 （默认为false）
 */
interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
  columns: ColumnProps[]
  requestApi: (params: any) => Promise<any>
  dataCallback?: (data: any) => any
  title?: string
  pagination?: boolean
  pageSize?: number
  initParam?: any
  border?: boolean
  toolButton?: boolean
  selectId?: string
  searchCol?: number | Record<BreakPoint, number>
  isShowSearch?: boolean
  onCollapse?: (collapsed: boolean) => void
  highlightCurrentRow?: boolean
}

// 🌟组件props的ts定义必须在组件中声明
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: false,
  toolButton: true,
  selectId: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  isShowSearch: true,
  highlightCurrentRow: false,
})

// --------------------表格-----------------------
const tableCard = ref()
const tableBody = ref()
const bodyViewType = ref(1)

// 表格全屏
const { isFullscreen, toggle } = useFullscreen(tableCard)

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  loading,
  search,
  reset,
  getTableList,
  handleSizeChange,
  handleCurrentChange,
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.pageSize,
  props.dataCallback,
)

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true })

// --------------------搜索-----------------------
// 是否显示搜索模块
const isShowSearch = ref(props.isShowSearch)

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
provide('enumMap', enumMap)

const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) return
  if (typeof col.enum !== 'function')
    return enumMap.value.set(col.prop!, col.enum!)
  const { data } = await col.enum()
  enumMap.value.set(col.prop!, data)
}

// 扁平化 columns
const flatColumnsFunc = (
  columns: ColumnProps[],
  flatArr: ColumnProps[] = [],
) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
    flatArr.push(col)

    // 给每一项 column 添加 isShow && isFilterEnum 默认属性
    col.isShow = col.isShow ?? true
    col.isFilterEnum = col.isFilterEnum ?? true

    setEnumMap(col)
  })
  return flatArr.filter((item) => !item._children?.length)
}
const flatColumns = ref<ColumnProps[]>()
flatColumns.value = flatColumnsFunc(tableColumns.value)

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item) => item.search?.el)

// 列设置 ==> 过滤掉不需要设置显隐的列
const colRef = ref()
const colSetting = tableColumns.value!.filter((item) => {
  return (
    item.type !== 'selection' &&
    item.type !== 'index' &&
    item.type !== 'expand' &&
    item.prop !== 'operation'
  )
})
const openColSetting = () => colRef.value.openColSetting()

const handleOpenCardList = () => {
  bodyViewType.value = 2
}

import { Job } from '@/api/job/list/type'
import { CardAreaProps } from '@/components/CardList/src/types'

const leftTop: CardAreaProps<Job.ResJobList> = {
  prop: 'title',
  // color: 'red',
  fontSize: '16px',
  render: ({ row }) => {
    let title = row.title
    if (row.location) {
      return (
        <>
          <span title={title}>{title} </span>
          <span class="left-top-right">[{row.location}] </span>
        </>
      )
    } else {
      return <>{title}</>
    }
  },
}

const rightTop: CardAreaProps<Job.ResJobList> = {
  prop: 'companyName',
  // color: 'red',
  fontSize: '16px',
}

const center: CardAreaProps<Job.ResJobList> = {
  prop: 'salary',
  color: 'red',
  fontSize: '16px',
}

const leftBottom: CardAreaProps<Job.ResJobList> = {
  prop: 'tag',
  // color: 'red',
  fontSize: '16px',
  render: ({ row }) => {
    // console.log(JSON.stringify(row))
    let cols = row.tag?.split(',')
    if (cols) {
      // 只展示前5
      if (cols.length > 5) {
        cols = cols.slice(0, 5)
      }

      return (
        <>
          {cols.map((item) => (
            <el-tag class="bottom-tag">{item}</el-tag>
          ))}
        </>
      )
    } else {
      return ''
    }
  },
}

const rightBottom: CardAreaProps<Job.ResJobList> = {
  prop: 'publishTime',
  fontSize: '16px',
}

/**
 * @description: 列表视图枚举
 * @argument TABLE    表格
 * @argument CARD     卡片
 */
const ListViewEnum = {
  TABLE: 1,
  CARD: 2,
}

let element = null
let isSelected: any = null
let selectedList: any = null
let selectedListIds: any = null
const clearSelection = () => tableBody?.value!.clearSelection()
onMounted(() => {
  element = computed(() => tableBody?.value.element)
  isSelected = computed(() => tableBody?.value.isSelected)
  selectedList = computed(() => tableBody?.value.selectedList)
  selectedListIds = computed(() => tableBody?.value.selectedListIds)
})

defineExpose({
  element,
  tableData,
  searchParam,
  pageable,
  enumMap,
  isSelected, // 是否有选中的数据
  selectedList,
  selectedListIds,
  reset,
  getTableList,
  clearSelection,
})
</script>

<style lang="scss" scoped>
@import './style/index';
</style>
