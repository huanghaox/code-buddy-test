<template>
  <li class="nav-item">
    <a 
      :href="anchor ? `#${anchor}` : path" 
      class="nav-link"
      :class="{ 'active': isActive }"
      @click.prevent="handleClick"
    >
      {{ text }}
    </a>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: number;
  text: string;
  path: string;
  anchor?: string;
  activeSection: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'navigate', anchor?: string): void;
}>();

// 计算当前项是否激活
const isActive = computed(() => {
  return props.anchor && props.activeSection === props.anchor;
});

// 处理点击事件
const handleClick = () => {
  emit('navigate', props.anchor);
};
</script>

<style scoped lang="less">
@import '../style.less';

.nav-item {
  .nav-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background: var(--primary-color, #3498db);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover {
      color: var(--primary-color, #3498db);

      &::after {
        width: 80%;
      }
    }

    &.active {
      color: var(--primary-color, #3498db);

      &::after {
        width: 80%;
      }
    }

    @media (max-width: 768px) {
      display: block;
      padding: 1rem;
      text-align: center;
      border-radius: 4px;

      &:hover {
        background: rgba(52, 152, 219, 0.1);
      }
    }
  }
}
</style>