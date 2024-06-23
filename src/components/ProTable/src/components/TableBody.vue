<template>
  <!-- 表格主体 -->
  <el-table
    ref="tableRef"
    v-bind="$attrs"
    v-loading="loading"
    :data="tableData"
    :row-key="getRowKeys"
    :border="border"
    :highlight-current-row="highlightCurrentRow"
    @selection-change="selectionChange"
    class="table-data"
  >
    <!-- default slot -->
    <slot></slot>
    <!-- render columns -->
    <template v-for="item in tableColumns" :key="item">
      <!-- selection || index -->
      <el-table-column
        v-bind="item"
        :align="item.align ?? 'center'"
        :reserve-selection="item.type == 'selection'"
        v-if="item.type == 'selection' || item.type == 'index'"
      ></el-table-column>
      <!-- expend -->
      <el-table-column
        v-bind="item"
        :align="item.align ?? 'center'"
        v-if="item.type == 'expand'"
        v-slot="scope"
      >
        <component
          :is="item.render"
          :row="scope.row"
          v-if="item.render"
        ></component>
        <slot :name="item.type" :row="scope.row" v-else></slot>
      </el-table-column>
      <!-- switch -->
      <el-table-column
        v-bind="item"
        :align="item.align ?? 'center'"
        v-if="item.type == 'switch' && item.prop && item.isShow"
        v-slot="scope"
      >
        <el-switch
          v-model="scope.row[item.prop]"
          :active-value="
            item.activeValue === undefined ? true : item.activeValue
          "
          :inactive-value="
            item.inactiveValue === undefined ? false : item.inactiveValue
          "
          :beforeChange="
            () => {
              if (!item.prop || !item.beforeChange) {
                return true
              }

              return item.beforeChange(scope.row[item.prop], scope.row)
            }
          "
          @change="item.onChange?.($event, scope.row)"
        ></el-switch>
      </el-table-column>
      <!-- other columns -->
      <TableColumn
        :column="item"
        v-if="(!item.type || item.type == 'default') && item.prop"
      >
        <template
          v-for="slot in Object.keys($slots)"
          :key="slot"
          #[slot]="scope"
        >
          <slot :name="slot" :row="scope.row"></slot>
        </template>
      </TableColumn>
    </template>

    <!-- 插入表格最后一行之后的插槽 -->
    <template #append>
      <slot name="append"></slot>
    </template>
    <!-- noData -->
    <template #empty>
      <div class="table-empty">
        <slot name="empty">
          <img src="../assets/images/notData.png" alt="noData" />
          <div>暂无数据</div>
        </slot>
      </div>
    </template>
  </el-table>
</template>

<script lang="ts" setup name="ProTable">
import { onMounted, ref } from 'vue'
import { useSelection } from '../hooks/useSelection'
import { ElTable, TableProps } from 'element-plus'
import type { ColumnProps } from '../types'
import TableColumn from './TableColumn.vue'

/**
 * @description: props类型定义
 * @param columns       - 列配置项
 * @param border        - 是否带有纵向边框 ==> 非必传（默认为true）
 * @param selectId      - 当表格数据多选时，所指定的字段名 ==> 非必传（默认为 id）
 * @param highlightCurrentRow    - 是否高亮选中行  ==> 非必传 （默认为false）
 * @param tableData    - 表格数据
 */
interface TableBodyProps extends Partial<Omit<TableProps<any>, 'data'>> {
  columns: ColumnProps[]
  loading?: boolean
  border?: boolean
  selectId?: string
  highlightCurrentRow?: boolean
  tableData: any[]
  afterMounted: () => any
}

// 🌟组件props的ts定义必须在组件中声明
const props = withDefaults(defineProps<TableBodyProps>(), {
  columns: () => [],
  border: false,
  loading: false,
  selectId: 'id',
  highlightCurrentRow: false,
  tableData: () => [],
})

console.log('init table')
// --------------------表格-----------------------

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>()

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

// 表格多选 Hooks
const {
  selectionChange,
  getRowKeys,
  selectedList,
  selectedListIds,
  isSelected,
} = useSelection(props.selectId)

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection()

onMounted(() => {
  if (props.afterMounted) {
    console.log('call props.afterMounted()')
    props.afterMounted()
  }
})

defineExpose({
  element: tableRef,
  isSelected,
  selectedList,
  selectedListIds,
  clearSelection,
})
</script>

<style lang="scss" scoped>
// @import '../style/index';
</style>
