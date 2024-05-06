<template>
  <div class="card">
    <div class="chart-title">今天订单金额占比分析</div>
    <div class="chart">
      <!-- chart区域 -->
      <RatioPieChart ref="ratioPieChartRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ECharts } from 'echarts'
import { ageData } from '@/views/report/data'
import RatioPieChart from '@/views/report/order/components/RatioPieChart.vue'

/* 获取最外层盒子 */
onMounted(() => {
  initCharts()
})

/* 声明echarts实例 */
interface ChartProps {
  [key: string]: ECharts | null
}
const dataScreen: ChartProps = {
  chart: null,
}

/* 获取子组件的ref */
interface ChartExpose {
  initChart: (params: any) => ECharts
}

const ratioPieChartRef = ref<ChartExpose>()

/* 初始化 echarts */
const initCharts = (): void => {
  dataScreen.chart = ratioPieChartRef.value?.initChart(ageData) as ECharts
}
</script>

<style scoped lang="scss">
.chart {
  width: 500px;
  height: 300px;
}
</style>
