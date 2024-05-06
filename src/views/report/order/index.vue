<template>
  <div class="box">
    <div class="chart-container card">
      <div class="chart-title"><span>今天订单金额占比分析</span></div>
      <div class="chart">
        <!-- chart区域 -->
        <RatioPieChart ref="ratioPieChartRef" />
      </div>
    </div>
    <div class="chart-container card">
      <div class="chart-title"><span>渠道销售统计</span></div>
      <div class="chart">
        <!-- chart区域 -->
        <BarChart ref="barChartRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ECharts } from 'echarts'
import { ageData } from '@/views/report/data/ageData'
import { channelSellAmount } from '@/views/report/data/channelSellAmount'
import RatioPieChart from '@/views/report/order/components/RatioPieChart.vue'
import BarChart from '@/views/report/order/components/BarChart.vue'

/* 获取最外层盒子 */
onMounted(() => {
  initCharts()
})

/* 声明echarts实例 */
interface ChartProps {
  [key: string]: ECharts | null
}
const dataScreen: ChartProps = {
  ratioPieChart: null,
  barChart: null,
}

/* 获取子组件的ref */
interface ChartExpose {
  initChart: (params: any) => ECharts
}

const ratioPieChartRef = ref<ChartExpose>()
const barChartRef = ref<ChartExpose>()

/* 初始化 echarts */
const initCharts = (): void => {
  dataScreen.ratioPieChart = ratioPieChartRef.value?.initChart(
    ageData,
  ) as ECharts
  dataScreen.barChart = barChartRef.value?.initChart({
    value: channelSellAmount.map((val) => val.value),
    columns: channelSellAmount.map((val) => val.name),
  }) as ECharts
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.box>div {
  height: 400px;
  flex: 1;
}

.chart-container {
  margin: 10px;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 100%;
}

.chart-title {
  span {
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 1px;
  }
}
</style>
