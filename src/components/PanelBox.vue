<template>
  <div class="panel-box">
    <div v-if="title" class="panel-header">
      <span class="panel-dot"></span>
      <span class="panel-title">{{ title }}</span>
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

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px 8px;
  border-bottom: 1px solid $color-border-light;

  .panel-dot {
    width: 4px;
    height: 14px;
    border-radius: 2px;
    background: $color-primary;
  }

  .panel-title {
    font-size: 14px;
    font-weight: 600;
    color: $color-text-primary;
  }
}

.panel-body {
  padding: 12px 16px;
}
</style>
