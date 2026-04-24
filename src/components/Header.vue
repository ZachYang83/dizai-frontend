<template>
  <header class="app-header">
    <div class="header-inner">
      <nav class="header-nav header-nav--left">
        <router-link
          v-for="item in leftMenus"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>

      <h1 class="header-title">地质灾害监测预警智能辅助决策系统</h1>

      <nav class="header-nav header-nav--right">
        <router-link
          v-for="item in rightMenus"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
const leftMenus = [
  { path: '/dashboard', label: '总览大屏', icon: '📊' },
  { path: '/ai-interpret', label: 'AI 解译', icon: '🤖' }
]
const rightMenus = [
  { path: '/predict-analysis', label: '预测分析', icon: '📈' },
  { path: '/geo-qa', label: '地灾问答', icon: '💬' }
]
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: $bg-header;
  box-shadow: 0 1px 4px rgba(37, 99, 235, 0.1);
  z-index: 100;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(90deg, $color-primary, $color-accent, $color-primary) 1;

  .header-inner {
    max-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
  }
}

.header-title {
  font-size: 22px;
  font-weight: 700;
  color: $color-primary;
  letter-spacing: 2px;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(37, 99, 235, 0.1);
}

.header-nav {
  display: flex;
  gap: 8px;
  flex: 1;

  &--left {
    justify-content: flex-start;
  }

  &--right {
    justify-content: flex-end;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: $radius-sm;
  color: $color-text-secondary;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  text-decoration: none;

  .nav-icon {
    font-size: 16px;
  }

  &:hover {
    color: $color-primary;
    background: rgba(37, 99, 235, 0.06);
  }

  &.active {
    color: $color-primary;
    background: rgba(37, 99, 235, 0.1);
    font-weight: 600;
  }

  &.router-link-active {
    color: $color-primary;
    background: rgba(37, 99, 235, 0.1);
    font-weight: 600;
  }
}
</style>
