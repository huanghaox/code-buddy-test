<template>
  <section class="panel" :id="id">
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
}>();
</script>

<style scoped>
.panel {
  flex: 0 0 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #2c8ed9, #1d6fb0);
}

.content {
  width: 100%;
  max-width: 150rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
</style>