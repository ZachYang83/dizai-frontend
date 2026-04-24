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
  background: rgba(0, 16, 40, 0.5);
  padding: 12px 14px;
  border: 1px solid $color-border-light;
  border-radius: 0;
  transition: all 0.3s;
  position: relative;

  &:hover {
    border-color: $color-border;
    box-shadow: 0 0 15px rgba(0, 140, 255, 0.08);
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
  font-size: 11px;
  font-weight: 600;
  border-radius: 0;
  letter-spacing: 1px;

  &.risk-red { background: rgba(255, 77, 106, 0.12); color: #ff4d6a; border: 1px solid rgba(255, 77, 106, 0.3); }
  &.risk-orange { background: rgba(255, 159, 67, 0.12); color: #ff9f43; border: 1px solid rgba(255, 159, 67, 0.3); }
  &.risk-yellow { background: rgba(255, 217, 61, 0.12); color: #ffd93d; border: 1px solid rgba(255, 217, 61, 0.3); }
  &.risk-blue { background: rgba(0, 208, 255, 0.12); color: #00d0ff; border: 1px solid rgba(0, 208, 255, 0.3); }
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
  margin-bottom: 10px;

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

      &.status.alert { color: #ff4d6a; text-shadow: 0 0 8px rgba(255, 77, 106, 0.4); }
      &.status.warning { color: #ff9f43; text-shadow: 0 0 8px rgba(255, 159, 67, 0.4); }
      &.status.normal { color: #00ff88; text-shadow: 0 0 8px rgba(0, 255, 136, 0.4); }
    }
  }
}

.item-actions {
  display: flex;
  gap: 8px;

  .btn {
    flex: 1;
    padding: 5px 0;
    border-radius: 0;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
    letter-spacing: 2px;
    position: relative;

    &:active {
      transform: scale(0.96);
    }

    &.btn-view {
      background: linear-gradient(180deg, rgba(0, 140, 255, 0.2) 0%, rgba(0, 140, 255, 0.05) 100%);
      border: 1px solid rgba(0, 180, 255, 0.35);
      color: #00d0ff;

      &:hover {
        background: linear-gradient(180deg, rgba(0, 140, 255, 0.35) 0%, rgba(0, 140, 255, 0.1) 100%);
        box-shadow: 0 0 14px rgba(0, 140, 255, 0.25), inset 0 0 8px rgba(0, 140, 255, 0.08);
        text-shadow: 0 0 6px rgba(0, 208, 255, 0.5);
      }
    }

    &.btn-edit {
      background: linear-gradient(180deg, rgba(0, 100, 200, 0.2) 0%, rgba(0, 100, 200, 0.05) 100%);
      border: 1px solid rgba(0, 120, 220, 0.35);
      color: #4db8ff;

      &:hover {
        background: linear-gradient(180deg, rgba(0, 100, 200, 0.35) 0%, rgba(0, 100, 200, 0.1) 100%);
        box-shadow: 0 0 14px rgba(0, 100, 200, 0.25), inset 0 0 8px rgba(0, 100, 200, 0.08);
        text-shadow: 0 0 6px rgba(77, 184, 255, 0.5);
      }
    }

    &.btn-delete {
      background: linear-gradient(180deg, rgba(255, 60, 80, 0.2) 0%, rgba(255, 60, 80, 0.05) 100%);
      border: 1px solid rgba(255, 77, 106, 0.35);
      color: #ff6b80;

      &:hover {
        background: linear-gradient(180deg, rgba(255, 60, 80, 0.35) 0%, rgba(255, 60, 80, 0.1) 100%);
        box-shadow: 0 0 14px rgba(255, 60, 80, 0.25), inset 0 0 8px rgba(255, 60, 80, 0.08);
        text-shadow: 0 0 6px rgba(255, 107, 128, 0.5);
      }
    }
  }
}
</style>
