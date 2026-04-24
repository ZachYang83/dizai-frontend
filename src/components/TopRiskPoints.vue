<template>
  <div class="top-risk-list">
    <div
      v-for="item in list"
      :key="item.rank"
      class="risk-item"
    >
      <span class="rank" :class="'rank-' + item.rank">{{ item.rank }}</span>
      <span class="name">{{ item.name }}</span>
      <span class="dot" :style="{ background: colorMap[item.risk] }"></span>
      <span v-if="item.alert" class="alert-badge">!</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTopRiskPoints } from '@/api/dashboard.js'

const list = ref([])
const colorMap = {
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  blue: '#3b82f6'
}

onMounted(async () => {
  list.value = await getTopRiskPoints()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.top-risk-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.risk-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: $radius-sm;
  transition: background 0.15s;
  cursor: pointer;

  &:hover {
    background: rgba(37, 99, 235, 0.04);
  }

  .rank {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;

    &.rank-1 { background: #ef4444; }
    &.rank-2 { background: #f97316; }
    &.rank-3 { background: #eab308; }
    &.rank-4, &.rank-5 { background: #94a3b8; }
  }

  .name {
    flex: 1;
    font-size: 12px;
    color: $color-text-primary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .alert-badge {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background: #fef3c7;
    color: #d97706;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
}
</style>
