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
        <span class="header-line"></span>
        <span class="right-title">监测点位列表</span>
        <span class="header-dash"></span>
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
@use '@/assets/styles/mixins.scss' as *;

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
  @include scrollbar-thin;
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
  background: $bg-panel;
  border: 1px solid $color-border-light;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 30px rgba(0, 100, 200, 0.04), 0 0 1px rgba(0, 180, 255, 0.1);
  position: relative;

  // 角标
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 14px; height: 14px;
    border-top: 2px solid $color-primary;
    border-left: 2px solid $color-primary;
    box-shadow: -2px -2px 6px rgba(0, 180, 255, 0.2);
    pointer-events: none;
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 14px; height: 14px;
    border-bottom: 2px solid $color-primary;
    border-right: 2px solid $color-primary;
    box-shadow: 2px 2px 6px rgba(0, 180, 255, 0.2);
    pointer-events: none;
    z-index: 2;
  }

  .right-corner-tr,
  .right-corner-bl {
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 2;
  }
}

.right-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px 8px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, $color-primary, rgba(0, 140, 255, 0.3) 50%, transparent);
    opacity: 0.6;
  }

  .header-line {
    width: 3px;
    height: 14px;
    border-radius: 1px;
    background: $color-primary;
    box-shadow: 0 0 8px $color-glow;
    flex-shrink: 0;
  }

  .right-title {
    font-size: 14px;
    font-weight: 600;
    color: $color-primary;
    letter-spacing: 1px;
    flex-shrink: 0;
  }

  .header-dash {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 180, 255, 0.3), transparent);
  }
}

& > :deep(.monitor-list) {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  @include scrollbar-thin;
}
</style>
