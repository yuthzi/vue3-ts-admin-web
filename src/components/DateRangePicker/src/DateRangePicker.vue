<template>
  <el-date-picker
    v-model="value"
    v-bind="attrs"
    ref="picker"
    :shortcuts="calendarShortcuts"
    :valueFormat="valueFormat"
    :type="type"
    :startPlaceholder="startPlaceholder"
    :endPlaceholder="endPlaceholder"
    :defaultTime="defaultTime"
    @change="handleChange"
  ></el-date-picker>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
// import { calendarShortcuts } from '@/utils/shortcuts'
import Date from '@/utils/datetime.js'

const props = defineProps({
  modelValue: Array,
  type: {
    type: String,
    default: 'daterange',
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss',
  },
  defaultTime: {
    type: Array,
    default: () => [
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 1, 1, 0, 0, 0),
    ],
  },
  startPlaceholder: {
    type: String,
    default: '开始日期',
  },
  endPlaceholder: {
    type: String,
    default: '结束日期',
  },
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
const hasPickValue = ref(props.modelValue)
function handleChange(val) {
  hasPickValue.value = val
}

const calendarBaseShortcuts = [
  {
    text: '今天',
    value: [
      new Date().setHours(0, 0, 0),
      new Date().daysAgo(-1).setHours(0, 0, 0),
    ],
  },
  {
    text: '昨天',
    value: [
      new Date().daysAgo(1).setHours(0, 0, 0),
      new Date().setHours(0, 0, 0),
    ],
  },
  {
    text: '本周',
    value: [
      new Date().daysAgo(new Date().getDay() - 1).setHours(0, 0, 0),
      new Date().daysAgo(-1).setHours(0, 0, 0),
    ],
  },
  {
    text: '这个月',
    value: [
      new Date().monthBegin().setHours(0, 0, 0),
      new Date().daysAgo(-1).setHours(0, 0, 0),
    ],
  },
  {
    text: '当前季度',
    value: [
      new Date().quarterBegin().setHours(0, 0, 0),
      new Date().daysAgo(-1).setHours(0, 0, 0),
    ],
  },
  {
    text: '最近30天',
    value: [
      new Date().daysAgo(30).setHours(0, 0, 0),
      new Date().daysAgo(-1).setHours(0, 0, 0),
    ],
  },
  {
    text: '今年',
    value: [
      new Date().yearBegin().setHours(0, 0, 0),
      new Date().daysAgo(-1).setHours(0, 0, 0),
    ],
  },
]

const calendarMoveShortcuts = [
  {
    text: '‹ 往前一天 ',
    value: () => {
      console.log('hasPickValue.value=' + JSON.stringify(hasPickValue.value))
      if (hasPickValue.value.length == 0) {
        // 昨天
        return [
          new new Date().daysAgo(1).setHours(0, 0, 0),
          new new Date().setHours(0, 0, 0),
        ]
      }

      let a = new Date(hasPickValue.value[0])
      let b = new Date(hasPickValue.value[1])
      const startTime = a.daysAgo(1).setHours(0, 0, 0)
      const endTime = b.setHours(0, 0, 0)
      return [startTime, endTime]
    },
  },
  {
    text: ' 往后一天 ›',
    value: () => {
      if (hasPickValue.value.length == 0) {
        // 明天
        return [
          new new Date().daysAgo(-1).setHours(0, 0, 0),
          new new Date().daysAgo(-2).setHours(0, 0, 0),
        ]
      }
      let a = new Date(hasPickValue.value[0])
      let b = new Date(hasPickValue.value[1])
      const startTime = a.daysAgo(-1).setHours(0, 0, 0)
      const endTime = b.daysAgo(-1).setHours(0, 0, 0)
      return [startTime, endTime]
    },
  },
]

const calendarShortcuts = [...calendarBaseShortcuts, ...calendarMoveShortcuts]
</script>
