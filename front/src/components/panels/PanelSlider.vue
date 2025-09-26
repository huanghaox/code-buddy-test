<template>
  <div class="panel-slider" ref="sliderRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';

const props = defineProps<{
  currentIndex: number;
}>();

const emit = defineEmits<{
  (e: 'update:currentIndex', index: number): void;
  (e: 'animationComplete'): void;
}>();

const sliderRef = ref<HTMLElement | null>(null);
const panelContents = ref<HTMLElement[]>([]);

// 初始化面板内容
function initPanelContents() {
  if (!sliderRef.value) return [];
  
  const panels = sliderRef.value.querySelectorAll('.panel .content');
  const contents: HTMLElement[] = [];
  
  panels.forEach((panel, i) => {
    const el = panel as HTMLElement;
    if (i === props.currentIndex) {
      gsap.set(el, { opacity: 1, x: 0 });
    } else {
      gsap.set(el, { opacity: 0, x: 50 });
    }
    contents.push(el);
  });
  
  return contents;
}

// 滑动到指定索引
function slideTo(index: number) {
  if (!sliderRef.value || panelContents.value.length === 0) return;
  
  const fromContent = panelContents.value[props.currentIndex];
  const toContent = panelContents.value[index];
  const vw = window.innerWidth;
  
  const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });
  
  tl.to(fromContent, { opacity: 0, x: -50, duration: 0.8 });
  tl.to(
    sliderRef.value,
    { x: -index * vw, duration: 1.5, ease: "sine.inOut" },
    "<0.05"
  );
  tl.fromTo(
    toContent,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 1.2 },
    "-=0.45"
  );
  
  tl.call(() => {
    emit('update:currentIndex', index);
    emit('animationComplete');
  });
}

// 暴露方法给父组件
defineExpose({
  slideTo
});

// 窗口缩放时更新位置
function handleResize() {
  if (!sliderRef.value) return;
  gsap.set(sliderRef.value, { x: -props.currentIndex * window.innerWidth });
}

onMounted(() => {
  panelContents.value = initPanelContents();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.panel-slider {
  display: flex;
  height: 100%;
  will-change: transform;
}
</style>