<template>
  <div class="center-map">
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
        <span class="legend-dot" :style="{ background: item.color }"></span>
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
  { label: '高风险 (I级)', color: '#ef4444' },
  { label: '中风险 (II级)', color: '#f97316' },
  { label: '低风险 (III级)', color: '#eab308' },
  { label: '一般 (IV级)', color: '#3b82f6' }
]

const riskColors = {
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  blue: '#3b82f6'
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
      mapStyle: 'amap://styles/whitesmoke',
      viewMode: '2D'
    })

    points.forEach(p => {
      const color = riskColors[p.riskLevel] || '#3b82f6'
      const marker = new AMap.CircleMarker({
        center: [p.lng, p.lat],
        radius: 8,
        fillColor: color,
        fillOpacity: 0.8,
        strokeColor: '#fff',
        strokeWeight: 2,
        strokeOpacity: 0.9
      })
      marker.setMap(map)

      const info = new AMap.InfoWindow({
        content: `<div style="padding:8px;font-size:13px;">
          <strong>${p.name}</strong><br/>
          编号: ${p.code}<br/>
          风险等级: ${p.riskLabel}<br/>
          雨量: ${p.rainfall}mm | 位移: ${p.displacement}cm
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
        background:linear-gradient(135deg,#e8f0fe 0%,#f0f5fa 100%);
        color:#64748b;font-size:15px;
      ">
        <div style="font-size:48px;margin-bottom:12px;">🗺️</div>
        <div>地图区域（需配置高德地图 Key）</div>
        <div style="font-size:12px;margin-top:8px;color:#94a3b8;">
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
  border-radius: $radius-md;
  overflow: hidden;
  background: $bg-panel;
  box-shadow: $shadow-sm;
  border: 1px solid $color-border-light;
}

.map-info-bar {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  font-size: 13px;
  color: $color-text-secondary;
  box-shadow: $shadow-md;
  backdrop-filter: blur(8px);

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
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
  background: rgba(255, 255, 255, 0.92);
  border-radius: $radius-sm;
  box-shadow: $shadow-sm;
  backdrop-filter: blur(8px);

  .legend-title {
    font-size: 12px;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: 6px;
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
