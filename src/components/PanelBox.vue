<template>
  <div class="panel-box">
    <span class="corner corner-tl"></span>
    <span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span>
    <span class="corner corner-br"></span>
    <div v-if="title" class="panel-header">
      <span class="header-line"></span>
      <span class="panel-title">{{ title }}</span>
      <span class="header-dash"></span>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;
@use '@/assets/styles/mixins.scss' as *;

.panel-box {
  @include panel-box;
  overflow: hidden;
  margin-bottom: 12px;
}

// ─── 四角 L 形发光角标 ───
.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  z-index: 2;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: $color-primary;
  }
}

.corner-tl {
  top: 0;
  left: 0;
  &::before { width: 14px; height: 2px; top: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 14px; top: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
}

.corner-tr {
  top: 0;
  right: 0;
  &::before { width: 14px; height: 2px; top: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 14px; top: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
}

.corner-bl {
  bottom: 0;
  left: 0;
  &::before { width: 14px; height: 2px; bottom: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 14px; bottom: 0; left: 0; box-shadow: 0 0 6px $color-glow; }
}

.corner-br {
  bottom: 0;
  right: 0;
  &::before { width: 14px; height: 2px; bottom: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
  &::after  { width: 2px; height: 14px; bottom: 0; right: 0; box-shadow: 0 0 6px $color-glow; }
}

// ─── 标题栏 ───
.panel-header {
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

  .panel-title {
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

.panel-body {
  padding: 12px 16px;
}
</style>
