<template>
  <!-- 年龄比例 -->
  <div class="echarts" id="BarChart"></div>
</template>

<script setup lang="ts">
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import { init } from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

const initChart = (data: any): ECharts => {
  const charEle = document.getElementById('BarChart') as HTMLElement
  const charEch: ECharts = init(charEle)
  const option: EChartsOption = {
    // color: colors,
    // tooltip: {
    //   show: true,
    //   trigger: 'item',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: data.columns,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '销量',
      },
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: '30%',
        label: {
          show: true,
        },
        data: data.value,
      },
    ],
  }
  charEch.setOption(option)
  return charEch
}
defineExpose({
  initChart,
})
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
