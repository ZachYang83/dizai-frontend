<template>
  <div class="placeholder-page">
    <div class="placeholder-content">
      <div class="icon">💬</div>
      <h2>地灾问答</h2>
      <p>地灾问答模块开发中</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.placeholder-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - #{$header-height});
  background: $bg-primary;
}

.placeholder-content {
  text-align: center;
  color: $color-text-muted;

  .icon { font-size: 48px; margin-bottom: 16px; }
  h2 { font-size: 20px; color: $color-text-primary; margin-bottom: 8px; }
  p { font-size: 14px; }
}
</style>
