<template>
  <div class="center-map">
    <span class="corner corner-tl"></span>
    <span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span>
    <span class="corner corner-br"></span>
    <div class="map-info-bar">
      <span class="status-dot"></span>
      <span>实时监测中</span>
      <span class="divider">|</span>
      <span>{{ pointCount }}个监测点位</span>
      <span class="divider">|</span>
      <span>数据更新：{{ updateTime }}</span>
    </div>
    <div ref="mapContainer" class="map-container"></div>
    <div class="map-legend">
      <div class="legend-title">风险等级</div>
      <div class="legend-item" v-for="item in legend" :key="item.label">
        <span class="legend-dot" :style="{ background: item.color, boxShadow: '0 0 4px ' + item.color }"></span>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { getMonitorPoints } from '@/api/monitor.js'

const mapContainer = ref(null)
const pointCount = ref(0)
const updateTime = ref(new Date().toLocaleDateString('zh-CN'))
let map = null

const legend = [
  { label: '高风险 (I级)', color: '#ff4d6a' },
  { label: '中风险 (II级)', color: '#ff9f43' },
  { label: '低风险 (III级)', color: '#ffd93d' },
  { label: '一般 (IV级)', color: '#00d0ff' }
]

const riskColors = {
  red: '#ff4d6a',
  orange: '#ff9f43',
  yellow: '#ffd93d',
  blue: '#00d0ff'
}

onMounted(async () => {
  const points = await getMonitorPoints()
  pointCount.value = points.length
  await nextTick()
  initMap(points)
})

onUnmounted(() => {
  map?.destroy()
})

async function initMap(points) {
  try {
    const AMap = await AMapLoader.load({
      key: 'YOUR_AMAP_KEY',
      version: '2.0'
    })

    map = new AMap.Map(mapContainer.value, {
      zoom: 10,
      center: [113.55, 23.45],
      mapStyle: 'amap://styles/dark',
      viewMode: '2D'
    })

    points.forEach(p => {
      const color = riskColors[p.riskLevel] || '#00d0ff'
      const marker = new AMap.CircleMarker({
        center: [p.lng, p.lat],
        radius: 8,
        fillColor: color,
        fillOpacity: 0.8,
        strokeColor: color,
        strokeWeight: 2,
        strokeOpacity: 0.9
      })
      marker.setMap(map)

      const info = new AMap.InfoWindow({
        content: `<div style="padding:10px;font-size:13px;color:#dce9f5;background:rgba(4,21,56,0.95);border:1px solid rgba(0,180,255,0.25);">
          <strong style="color:#00d0ff;">${p.name}</strong><br/>
          <span style="color:#6fb4e0;">编号: ${p.code}</span><br/>
          <span style="color:#6fb4e0;">风险等级: ${p.riskLabel}</span><br/>
          <span style="color:#6fb4e0;">雨量: ${p.rainfall}mm | 位移: ${p.displacement}cm</span>
        </div>`,
        offset: new AMap.Pixel(0, -12)
      })

      marker.on('click', () => {
        info.open(map, [p.lng, p.lat])
      })
    })

    map.setFitView()
  } catch (e) {
    console.warn('地图加载失败，使用占位显示:', e.message)
    mapContainer.value.innerHTML = `
      <div style="
        width:100%;height:100%;
        display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        background:radial-gradient(ellipse at center, rgba(0,60,120,0.25) 0%, rgba(4,13,33,0.9) 70%);
        color:#6fb4e0;font-size:15px;
      ">
        <div style="font-size:48px;margin-bottom:12px;">🗺️</div>
        <div style="color:#00d0ff;font-size:16px;">地图区域（需配置高德地图 Key）</div>
        <div style="font-size:12px;margin-top:8px;color:#3d6d8e;">
          共 ${pointCount.value} 个监测点位
        </div>
      </div>
    `
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.center-map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $bg-panel;
  border: 1px solid $color-border-light;
  box-shadow: inset 0 0 30px rgba(0, 100, 200, 0.04), 0 0 1px rgba(0, 180, 255, 0.1);
  backdrop-filter: blur(8px);
}

// ─── 四角 L 形角标 ───
.corner {
  position: absolute;
  width: 18px;
  height: 18px;
  z-index: 20;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: $color-primary;
  }
}

.corner-tl {
  top: 0; left: 0;
  &::before { width: 18px; height: 2px; top: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 18px; top: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
}
.corner-tr {
  top: 0; right: 0;
  &::before { width: 18px; height: 2px; top: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 18px; top: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
}
.corner-bl {
  bottom: 0; left: 0;
  &::before { width: 18px; height: 2px; bottom: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 18px; bottom: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
}
.corner-br {
  bottom: 0; right: 0;
  &::before { width: 18px; height: 2px; bottom: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 18px; bottom: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
}

.map-info-bar {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 20px;
  background: rgba(2, 12, 36, 0.8);
  border: 1px solid $color-border;
  font-size: 13px;
  color: $color-text-secondary;
  backdrop-filter: blur(10px);

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #00ff88;
    box-shadow: 0 0 8px #00ff88;
    animation: pulse 2s infinite;
  }

  .divider {
    color: $color-border;
    margin: 0 2px;
  }
}

.map-container {
  width: 100%;
  height: 100%;
}

.map-legend {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 10;
  padding: 10px 14px;
  background: rgba(2, 12, 36, 0.8);
  border: 1px solid $color-border;
  backdrop-filter: blur(10px);

  .legend-title {
    font-size: 12px;
    font-weight: 600;
    color: $color-primary;
    margin-bottom: 6px;
    letter-spacing: 1px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: $color-text-secondary;
    margin-bottom: 3px;

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px #00ff88; }
  50% { opacity: 0.4; box-shadow: 0 0 3px #00ff88; }
}
</style>
