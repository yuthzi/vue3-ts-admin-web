<template>
  <el-date-picker
    v-model="value"
    v-bind="attrs"
    ref="picker"
    :shortcuts="calendarShortcuts"
    :valueFormat="valueFormat"
    :type="'daterange'"
    :startPlaceholder="startPlaceholder"
    :endPlaceholder="endPlaceholder"
    @change="handleChange"
  ></el-date-picker>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { daysAgo, monthBegin, quarterBegin, yearBegin } from '@/utils/datetime'

export interface DateRangeProps {
  modelValue?: string[]
  valueFormat?: string
  startPlaceholder?: string
  endPlaceholder?: string
}

// 组件props
const props = withDefaults(defineProps<DateRangeProps>(), {
  modelValue: () => {
    return []
  },
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
})

const emits = defineEmits(['update:modelValue'])
const attrs = useAttrs()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const picker = ref()
const hasPickValue = ref<string[]>()

function handleChange(val: any) {
  hasPickValue.value = val
}

const calendarBaseShortcuts = [
  {
    text: '今天',
    value: [
      new Date().setHours(0, 0, 0),
      daysAgo(new Date(), -1).setHours(0, 0, 0),
    ],
  },
  {
    text: '昨天',
    value: [
      daysAgo(new Date(), 1).setHours(0, 0, 0),
      new Date().setHours(0, 0, 0),
    ],
  },
  {
    text: '本周',
    value: [
      daysAgo(new Date(), new Date().getDay() - 1).setHours(0, 0, 0),
      daysAgo(new Date(), -1).setHours(0, 0, 0),
    ],
  },
  {
    text: '这个月',
    value: [
      monthBegin(new Date()).setHours(0, 0, 0),
      daysAgo(new Date(), -1).setHours(0, 0, 0),
    ],
  },
  {
    text: '当前季度',
    value: [
      quarterBegin(new Date()).setHours(0, 0, 0),
      daysAgo(new Date(), -1).setHours(0, 0, 0),
    ],
  },
  {
    text: '最近30天',
    value: [
      daysAgo(new Date(), 30).setHours(0, 0, 0),
      daysAgo(new Date(), -1).setHours(0, 0, 0),
    ],
  },
  {
    text: '今年',
    value: [
      yearBegin(new Date()).setHours(0, 0, 0),
      daysAgo(new Date(), -1).setHours(0, 0, 0),
    ],
  },
]

const calendarMoveShortcuts = [
  {
    text: '‹ 往前一天 ',
    value: () => {
      console.log('hasPickValue.value=' + JSON.stringify(hasPickValue.value))
      if (!hasPickValue.value || hasPickValue.value.length == 0) {
        // 昨天
        return [
          daysAgo(new Date(), 1).setHours(0, 0, 0),
          new Date().setHours(0, 0, 0),
        ]
      }

      let a = new Date(hasPickValue.value[0])
      let b = new Date(hasPickValue.value[1])
      const startTime = daysAgo(a, 1).setHours(0, 0, 0)
      const endTime = b.setHours(0, 0, 0)
      return [startTime, endTime]
    },
  },
  {
    text: ' 往后一天 ›',
    value: () => {
      if (!hasPickValue.value || hasPickValue.value.length == 0) {
        // 明天
        return [
          daysAgo(new Date(), -1).setHours(0, 0, 0),
          daysAgo(new Date(), -2).setHours(0, 0, 0),
        ]
      }
      let a = new Date(hasPickValue.value[0])
      let b = new Date(hasPickValue.value[1])
      const startTime = daysAgo(a, -1).setHours(0, 0, 0)
      const endTime = daysAgo(b, -1).setHours(0, 0, 0)
      return [startTime, endTime]
    },
  },
]

const calendarShortcuts = [...calendarBaseShortcuts, ...calendarMoveShortcuts]
</script>
