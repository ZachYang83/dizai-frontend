<template>
  <div class="top-risk-list">
    <div
      v-for="item in list"
      :key="item.rank"
      class="risk-item"
    >
      <span class="rank" :class="'rank-' + item.rank">{{ item.rank }}</span>
      <span class="name">{{ item.name }}</span>
      <span class="dot" :style="{ background: colorMap[item.risk], boxShadow: '0 0 5px ' + colorMap[item.risk] }"></span>
      <span v-if="item.alert" class="alert-badge">!</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTopRiskPoints } from '@/api/dashboard.js'

const list = ref([])
const colorMap = {
  red: '#ff4d6a',
  orange: '#ff9f43',
  yellow: '#ffd93d',
  blue: '#00d0ff'
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
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 180, 255, 0.05);
  }

  .rank {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;

    &.rank-1 {
      background: linear-gradient(135deg, #ff4d6a, #ff2d4f);
      color: #fff;
      box-shadow: 0 0 8px rgba(255, 77, 106, 0.4);
    }
    &.rank-2 {
      background: linear-gradient(135deg, #ff9f43, #ff7b00);
      color: #fff;
      box-shadow: 0 0 8px rgba(255, 159, 67, 0.4);
    }
    &.rank-3 {
      background: linear-gradient(135deg, #ffd93d, #ffb300);
      color: #fff;
      box-shadow: 0 0 8px rgba(255, 217, 61, 0.3);
    }
    &.rank-4, &.rank-5 {
      background: rgba(0, 180, 255, 0.15);
      border: 1px solid rgba(0, 180, 255, 0.3);
      color: $color-primary;
    }
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
    border-radius: 0;
    background: rgba(255, 159, 67, 0.12);
    border: 1px solid rgba(255, 159, 67, 0.4);
    color: #ff9f43;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
}
</style>
