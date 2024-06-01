<template>
  <div>
    <div>
      <el-input
        v-model="inputModel"
        style="width: 240px"
        :placeholder="placeholder"
        :clearable="true"
        @click="handleClick"
        @clear="handleClear"
      />
    </div>
    <el-dialog
      :title="title"
      width="800px"
      v-model="dialogVisible"
      destroy-on-close
      lock-scroll
      :align-center="true"
      :style="{
        '--table-data-minus-height': tableDataMinusHeight,
        'border-radius': '5px',
      }"
    >
      <div class="dialog-container">
        <div>
          <ProTable
            ref="proTable"
            :selectId="selectId"
            :dataCallback="dataCallback"
            :columns="columns"
            :isShowSearch="isShowSearch"
            :requestApi="requestApi"
            :pageSize="pageSize"
            :initParam="initParam"
            :onCollapse="onCollapse"
            :highlightCurrentRow="highlightCurrentRow"
          ></ProTable>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定选择</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script name="SelectorDialog" lang="ts" setup>
/**
 * 选择数据对话框
 */

import { computed, defineEmits, reactive, ref, watch } from 'vue'
import { ColumnProps, BreakPoint } from '@/components/ProTable/src/types'
import { TableProps } from 'element-plus'

const emit = defineEmits([
  // 'updateInput',
  'update:modelValue',
  'input',
  'change',
])

/**
 * @description: props类型定义。兼容ProTable的props类型定义
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
interface DialogProps extends Partial<Omit<TableProps<any>, 'data'>> {
  modelValue?: any
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
  placeholder?: string // 输入框的占位符
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
  labelKey: string
  valueKey: string
}

const dialogVisible = ref(false)
// props定义
const props = withDefaults(defineProps<DialogProps>(), {
  title: '请选择',
  placeholder: '请输入',
  modelValue: '',
  highlightCurrentRow: true,
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  selectId: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  isShowSearch: true,
})

const inputModel = ref(!props.modelValue ? '' : String(props.modelValue))
// 响应父组件重置的关键点: modelValue(名称固定), computed(ref不行), watch
const nativeInputValue = computed(() =>
  !props.modelValue ? '' : String(props.modelValue),
)
watch(nativeInputValue, (val, oldVal) => {
  console.log('watch input value', val, oldVal)
  // 只有父组件重置清除数据时才需要更新inputModel。即数据变化是自父组件到子组件。输入时是：子组件到父组件
  if (val.length == 0) {
    inputModel.value = ''
  }
})

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *查询参数
const initParam = reactive({})

// 有搜索条件的列个数
const searchColCount = props.columns.filter((item) => item.search?.el).length
// 处理高度
let tableDataMinusHeight = ref('110px')

function onCollapse(collapsed: boolean) {
  // console.log(
  //   'collapsed=' + collapsed,
  //   ((searchColCount + 1) / 2) * 50 + 90 + 'px',
  // )

  // 一行占50px
  if (collapsed) {
    tableDataMinusHeight.value = '140px'
  } else {
    let h = ((searchColCount + 1) / 2) * 50 + 90
    if (h > 400) {
      h = 400
    }

    tableDataMinusHeight.value = h + 'px'
  }
}

function handleClick() {
  dialogVisible.value = true
}

function handleClear() {
  dialogVisible.value = false
  emit('update:modelValue', '')
}

function handleConfirm() {
  dialogVisible.value = false
  // console.log('selectedList=' + JSON.stringify(proTable.value.selectedList))
  if (proTable.value.selectedList) {
    const v = proTable.value.selectedList[0]
    inputModel.value = v[props.labelKey]
    // console.log('value=' + inputData.value)
    const value = v[props.valueKey]
    // 发送给父组件
    emit('update:modelValue', value)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-dialog__header {
    padding: 5px 20px;
  }
}

.dialog-container {
  --dialog-container-height: 60vh;
  height: var(--dialog-container-height);
  padding-right: 0px;

  ::v-deep .table-search {
    padding-top: 10px;
    margin-bottom: 0px;
  }

  ::v-deep .table {
    padding-top: 10px;
    margin-bottom: 2px;
    height: calc(
      var(--dialog-container-height) - var(--table-data-minus-height)
    );

    .table-header {
      margin-bottom: 5px;
    }

    .table-data {
      overflow-y: auto;
      height: 100%;
      padding-left: 0px;
      padding-right: 0px;
    }

    .pagination {
      margin-top: 5px;
    }

    .table-empty {
      padding-top: 20px;
    }
  }
}

.dialog-footer {
  padding-top: 10px;
  border-top: 1px solid var(--el-border-color-lighter);
  display: flex;
  justify-content: center;
}
</style>
