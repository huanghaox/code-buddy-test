<template>
  <PanelManager ref="panelManager" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PanelManager from '../components/panels/PanelManager.vue';

const panelManager = ref(null);

// 声明全局类型
declare global {
  interface Window {
    currentSectionId?: string;
    scrollToSection?: (sectionId: string) => boolean | void;
  }
}
</script>

<style>
/* 全局样式可以放在这里 */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  overflow: hidden;
}
</style>