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
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: {
        fontSize: 10,
        color: '#94a3b8',
        interval: 5
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#94a3b8' }
    },
    series: [{
      type: 'line',
      data: data.values,
      smooth: true,
      symbol: 'none',
      lineStyle: { color: '#2563eb', width: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(37,99,235,0.2)' },
          { offset: 1, color: 'rgba(37,99,235,0.02)' }
        ])
      }
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1e293b', fontSize: 12 }
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
    color: #64748b;
  }

  .trend-value {
    font-size: 20px;
    font-weight: 700;
    color: #2563eb;
  }
}

.trend-chart {
  width: 100%;
  height: 120px;
}
</style>
