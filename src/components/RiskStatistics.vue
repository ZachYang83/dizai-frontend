<template>
  <div class="risk-cards">
    <div
      v-for="item in cards"
      :key="item.key"
      class="risk-card"
      :style="{ '--card-color': item.color }"
    >
      <div class="card-value">{{ item.count }}</div>
      <div class="card-label">{{ item.label }}</div>
      <div class="card-level">{{ item.level }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStatistics } from '@/api/dashboard.js'

const cards = ref([])

const colorMap = {
  red: '#ff4d6a',
  orange: '#ff9f43',
  yellow: '#ffd93d',
  blue: '#00d0ff'
}

onMounted(async () => {
  const data = await getStatistics()
  cards.value = Object.entries(data).map(([key, val]) => ({
    key,
    count: val.count,
    label: val.label,
    level: val.level,
    color: colorMap[key]
  }))
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.risk-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.risk-card {
  position: relative;
  background: rgba(0, 14, 36, 0.5);
  padding: 12px 14px;
  border: 1px solid $color-border-light;
  border-left: 3px solid var(--card-color);
  transition: all 0.3s;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at top left, var(--card-color) 0%, transparent 60%);
    opacity: 0.04;
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 0 16px rgba(0, 140, 255, 0.08);
    border-color: $color-border;
    border-left-color: var(--card-color);
  }

  .card-value {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--card-color);
    text-shadow: 0 0 10px var(--card-color);
  }

  .card-label {
    font-size: 12px;
    color: $color-text-secondary;
    margin-top: 2px;
  }

  .card-level {
    font-size: 11px;
    color: $color-text-muted;
    margin-top: 1px;
  }
}
</style>
