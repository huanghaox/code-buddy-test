<template>
  <div class="generic-panel">
    <h2>{{ title }}</h2>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.generic-panel {
  width: 100%;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
}

.content {
  color: #fff;
  font-size: 1.2rem;
}
</style>