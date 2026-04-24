<template>
  <div class="monitor-list">
    <div
      v-for="point in points"
      :key="point.id"
      class="monitor-item"
    >
      <div class="item-header">
        <span class="item-name">{{ point.name }}</span>
        <span class="risk-tag" :class="'risk-' + point.riskLevel">{{ point.riskLabel }}</span>
      </div>
      <div class="item-meta">
        <span>编号: {{ point.code }}</span>
        <span>区域: {{ point.region }}</span>
      </div>
      <div class="item-data">
        <div class="data-item">
          <span class="data-label">雨量</span>
          <span class="data-value">{{ point.rainfall }}<small>mm</small></span>
        </div>
        <div class="data-item">
          <span class="data-label">位移</span>
          <span class="data-value">{{ point.displacement }}<small>cm</small></span>
        </div>
        <div class="data-item">
          <span class="data-label">状态</span>
          <span class="data-value status" :class="point.status">
            {{ statusMap[point.status] }}
          </span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-view" @click="$emit('view', point)">查看</button>
        <button class="btn btn-edit" @click="$emit('edit', point)">编辑</button>
        <button class="btn btn-delete" @click="$emit('delete', point)">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMonitorPoints } from '@/api/monitor.js'

defineEmits(['view', 'edit', 'delete'])

const points = ref([])
const statusMap = {
  alert: '预警',
  warning: '异常',
  normal: '正常'
}

onMounted(async () => {
  points.value = await getMonitorPoints()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;
@use '@/assets/styles/mixins.scss' as *;

.monitor-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  @include scrollbar-thin;
  overflow-y: auto;
  max-height: 100%;
  padding-right: 4px;
}

.monitor-item {
  background: $bg-panel;
  border-radius: $radius-sm;
  padding: 12px 14px;
  border: 1px solid $color-border-light;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: $shadow-md;
  }
}

.item-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;

  .item-name {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: $color-text-primary;
    @include text-ellipsis;
  }
}

.risk-tag {
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;

  &.risk-red { background: #fef2f2; color: #dc2626; }
  &.risk-orange { background: #fff7ed; color: #ea580c; }
  &.risk-yellow { background: #fefce8; color: #ca8a04; }
  &.risk-blue { background: #eff6ff; color: #2563eb; }
}

.item-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: $color-text-muted;
  margin-bottom: 8px;
}

.item-data {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;

  .data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    .data-label {
      font-size: 10px;
      color: $color-text-muted;
    }

    .data-value {
      font-size: 14px;
      font-weight: 600;
      color: $color-text-primary;

      small {
        font-size: 10px;
        font-weight: 400;
        color: $color-text-muted;
        margin-left: 1px;
      }

      &.status.alert { color: #ef4444; }
      &.status.warning { color: #f97316; }
      &.status.normal { color: #22c55e; }
    }
  }
}

.item-actions {
  display: flex;
  gap: 6px;

  .btn {
    flex: 1;
    padding: 4px 0;
    border: none;
    border-radius: 4px;
    font-size: 11px;
    cursor: pointer;
    transition: opacity 0.15s;

    &:hover { opacity: 0.8; }

    &.btn-view { background: rgba(37,99,235,0.08); color: #2563eb; }
    &.btn-edit { background: rgba(6,182,212,0.08); color: #06b6d4; }
    &.btn-delete { background: rgba(239,68,68,0.08); color: #ef4444; }
  }
}
</style>
