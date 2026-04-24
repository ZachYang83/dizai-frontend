<template>
  <div class="abnormal-trend">
    <div class="trend-header">
      <span class="trend-label">24H异常次数</span>
      <span class="trend-value">{{ total }}</span>
    </div>
    <div ref="chartRef" class="trend-chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { getAbnormalTrend } from '@/api/dashboard.js'

const chartRef = ref(null)
let chart = null
const total = ref(0)

onMounted(async () => {
  const data = await getAbnormalTrend()
  total.value = data.total
  initChart(data)
})

onUnmounted(() => {
  chart?.dispose()
})

function initChart(data) {
  chart = echarts.init(chartRef.value)
  chart.setOption({
    grid: { top: 10, right: 10, bottom: 20, left: 30 },
    xAxis: {
      type: 'category',
      data: data.hours,
      axisLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.12)' } },
      axisLabel: { fontSize: 10, color: '#3d6d8e', interval: 5 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.06)', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#3d6d8e' }
    },
    series: [{
      type: 'line',
      data: data.values,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#00d0ff',
        width: 2,
        shadowColor: 'rgba(0, 208, 255, 0.5)',
        shadowBlur: 10
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 208, 255, 0.2)' },
          { offset: 1, color: 'rgba(0, 208, 255, 0.01)' }
        ])
      }
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(2, 12, 36, 0.92)',
      borderColor: 'rgba(0, 180, 255, 0.25)',
      textStyle: { color: '#dce9f5', fontSize: 12 }
    }
  })
}
</script>

<style lang="scss" scoped>
.trend-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;

  .trend-label {
    font-size: 13px;
    color: #6fb4e0;
  }

  .trend-value {
    font-size: 20px;
    font-weight: 700;
    color: #00d0ff;
    text-shadow: 0 0 10px rgba(0, 208, 255, 0.4);
  }
}

.trend-chart {
  width: 100%;
  height: 120px;
}
</style>
