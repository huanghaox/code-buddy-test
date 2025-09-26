<template>
  <div class="home-panel">
    <h1>{{ title }}</h1>
    <div>
      <span class="description_separator"></span>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped>
.home-panel {
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 3.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
}

.description_separator {
  display: inline-block;
  width: 8.7rem;
  height: .1rem;
  background-color: #e58707;
  vertical-align: middle;
  margin-right: 2.8rem;
}

p {
  display: inline-block;
  color: #fff;
  font-size: 1.2rem;
}
</style>