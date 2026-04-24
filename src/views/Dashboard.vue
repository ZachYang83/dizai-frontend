<template>
  <div class="dashboard">
    <div class="dashboard-left">
      <PanelBox title="风险统计">
        <RiskStatistics />
      </PanelBox>
      <PanelBox title="24H异常趋势">
        <AbnormalTrend />
      </PanelBox>
      <PanelBox title="风险等级分布">
        <RiskDistribution />
      </PanelBox>
      <PanelBox title="TOP5风险点">
        <TopRiskPoints />
      </PanelBox>
    </div>

    <div class="dashboard-center">
      <CenterMap />
    </div>

    <div class="dashboard-right">
      <div class="right-header">
        <span class="dot-indicator"></span>
        <span>监测点位列表</span>
      </div>
      <MonitorPointList
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import PanelBox from '@/components/PanelBox.vue'
import RiskStatistics from '@/components/RiskStatistics.vue'
import AbnormalTrend from '@/components/AbnormalTrend.vue'
import RiskDistribution from '@/components/RiskDistribution.vue'
import TopRiskPoints from '@/components/TopRiskPoints.vue'
import CenterMap from '@/components/CenterMap.vue'
import MonitorPointList from '@/components/MonitorPointList.vue'

function handleView(point) {
  console.log('查看点位:', point.name)
}

function handleEdit(point) {
  console.log('编辑点位:', point.name)
}

function handleDelete(point) {
  console.log('删除点位:', point.name)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.dashboard {
  display: flex;
  gap: 12px;
  height: calc(100vh - #{$header-height});
  padding: 12px;
  background: $bg-primary;
}

.dashboard-left {
  width: $sidebar-width;
  min-width: 280px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: $color-border;
    border-radius: 2px;
  }
}

.dashboard-center {
  flex: 1;
  min-width: 0;
}

.dashboard-right {
  width: $sidebar-width;
  min-width: 280px;
  max-width: 340px;
  display: flex;
  flex-direction: column;

  .right-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: $bg-panel;
    border-radius: $radius-md $radius-md 0 0;
    border: 1px solid $color-border-light;
    border-bottom: none;
    font-size: 14px;
    font-weight: 600;
    color: $color-text-primary;

    .dot-indicator {
      width: 4px;
      height: 14px;
      border-radius: 2px;
      background: $color-primary;
    }
  }

  & > :deep(.monitor-list) {
    flex: 1;
    overflow-y: auto;
    background: $bg-panel;
    border-radius: 0 0 $radius-md $radius-md;
    border: 1px solid $color-border-light;
    border-top: none;
    padding: 8px 12px;
  }
}
</style>
