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
      splitLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.06)', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#3d6d8e' }
    },
    yAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.12)' } },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, color: '#6fb4e0' }
    },
    series: [{
      type: 'bar',
      data: data.map(d => ({
        value: d.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(0, 80, 160, 0.3)' },
            { offset: 1, color: d.color }
          ]),
          borderRadius: [0, 2, 2, 0],
          shadowColor: d.color,
          shadowBlur: 4
        }
      })),
      barWidth: 14
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(2, 12, 36, 0.92)',
      borderColor: 'rgba(0, 180, 255, 0.25)',
      textStyle: { color: '#dce9f5', fontSize: 12 }
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
