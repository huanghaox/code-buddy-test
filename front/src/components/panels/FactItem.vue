<template>
  <div class="item">
    <div class="number">{{ id }}</div>
    <div class="icon">
      <i :class="icon"></i>
    </div>
    <p class="desc">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  icon: string;
  text: string;
}>();
</script>

<style scoped>
.item {
  text-align: center;
  position: relative;
}

.number {
  background: #f18a00;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  margin-bottom: 12px;
}

.icon {
  font-size: 36px;
  color: #f18a00;
  margin-bottom: 12px;
}

.desc {
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
}
</style>