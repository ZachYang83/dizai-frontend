<template>
  <div class="risk-cards">
    <div
      v-for="item in cards"
      :key="item.key"
      class="risk-card"
      :style="{ borderLeftColor: item.color }"
    >
      <div class="card-value" :style="{ color: item.color }">{{ item.count }}</div>
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
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  blue: '#3b82f6'
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
  background: $bg-panel;
  border-radius: $radius-sm;
  padding: 12px 14px;
  border-left: 3px solid;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  .card-value {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.2;
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
