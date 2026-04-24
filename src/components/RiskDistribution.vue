<template>
  <div ref="chartRef" class="risk-distribution"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { getRiskDistribution } from '@/api/dashboard.js'

const chartRef = ref(null)
let chart = null

onMounted(async () => {
  const data = await getRiskDistribution()
  initChart(data)
})

onUnmounted(() => {
  chart?.dispose()
})

function initChart(data) {
  chart = echarts.init(chartRef.value)
  chart.setOption({
    grid: { top: 10, right: 20, bottom: 24, left: 60 },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#94a3b8' }
    },
    yAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, color: '#64748b' }
    },
    series: [{
      type: 'bar',
      data: data.map(d => ({
        value: d.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: d.color + '99' },
            { offset: 1, color: d.color }
          ]),
          borderRadius: [0, 4, 4, 0]
        }
      })),
      barWidth: 16
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#fff',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1e293b', fontSize: 12 }
    }
  })
}
</script>

<style lang="scss" scoped>
.risk-distribution {
  width: 100%;
  height: 140px;
}
</style>
