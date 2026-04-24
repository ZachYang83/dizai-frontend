<template>
  <header class="app-header">
    <div class="header-bg"></div>
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

    <div class="header-bottom">
      <div class="header-line-left"></div>
      <div class="header-diamond">
        <span class="diamond-inner"></span>
      </div>
      <div class="header-line-right"></div>
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
  z-index: 100;
  background: $bg-header;
  backdrop-filter: blur(20px);
}

.header-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 60, 140, 0.15) 0%, transparent 100%);
  pointer-events: none;
}

.header-inner {
  position: relative;
  max-width: 100%;
  height: calc(100% - 3px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}

.header-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 4px;
  white-space: nowrap;
  position: relative;
  background: linear-gradient(180deg, #ffffff 20%, $color-primary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 12px rgba(0, 180, 255, 0.25));
  flex-shrink: 0;
}

.header-nav {
  display: flex;
  gap: 6px;
  flex: 1;

  &--left { justify-content: flex-start; }
  &--right { justify-content: flex-end; }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 18px;
  color: $color-text-secondary;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;
  position: relative;
  letter-spacing: 1px;

  .nav-icon { font-size: 14px; }

  &:hover {
    color: $color-primary;
    background: rgba(0, 180, 255, 0.06);
    border-color: rgba(0, 180, 255, 0.15);
  }

  &.active,
  &.router-link-active {
    color: $color-primary;
    background: rgba(0, 140, 255, 0.1);
    border-color: rgba(0, 180, 255, 0.3);
    font-weight: 600;
    box-shadow: 0 0 12px rgba(0, 140, 255, 0.12), inset 0 0 12px rgba(0, 140, 255, 0.04);
    text-shadow: 0 0 8px rgba(0, 208, 255, 0.4);
  }
}

// ─── 底部装饰线 ───
.header-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  display: flex;
  align-items: center;
}

.header-line-left,
.header-line-right {
  flex: 1;
  height: 1px;
}

.header-line-left {
  background: linear-gradient(90deg, transparent, $color-primary 40%);
}

.header-line-right {
  background: linear-gradient(90deg, $color-primary 60%, transparent);
}

.header-diamond {
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 6px;

  .diamond-inner {
    width: 6px;
    height: 6px;
    background: $color-primary;
    transform: rotate(45deg);
    box-shadow: 0 0 8px $color-glow;
  }
}
</style>
